const express = require('express');
const { Op } = require('sequelize');

const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");

const { Spot, SpotImage, Review, Booking, User } = require('../../db/models');

const router = express.Router();

// Delete an existing image for a spot
router.delete('/:imageId', requireAuth, async(req, res, next) => {
    const deleteSpotImage = await SpotImage.findOne({
        where: {
            id: req.params.imageId
        }
    })

    if (!deleteSpotImage) {
        const err = new Error("Spot Image couldn't be found")
        err.status = 404
        return next(err)
    }

    const currentSpot = await deleteSpotImage.getSpot()

    const currentUser = await User.findOne({
        where: {
            id: req.user.id
        }
    })

    // console.log('currentSpot===============', currentSpot.toJSON())
    // console.log('currentUser===============', currentUser.toJSON())

    if (parseInt(currentUser.toJSON().id) !== parseInt(currentSpot.toJSON().ownerId)) {
        const err = new Error('forbidden')
        err.status = 403
        return next(err)
    }

    await deleteSpotImage.destroy()

    return res.json({
        message: "Successfully deleted"
    })

})






module.exports = router
