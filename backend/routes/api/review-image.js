const express = require('express');
const { Op } = require('sequelize');

const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");

const { Spot, SpotImage, Review, Booking, User, ReviewImage } = require('../../db/models');

const router = express.Router();


router.delete('/:imageId', requireAuth, async(req, res, next) => {
    const deleteReviewImage = await ReviewImage.findOne({
        where: {
            id: req.params.imageId
        }
    })

    if (!deleteReviewImage) {
        const err = new Error("Review Image couldn't be found")
        err.status = 404
        return next(err)
    }

    const review = await deleteReviewImage.getReview()
    // console.log(review.toJSON())

    if (req.user.id !== review.toJSON().userId) {
        const err = new Error('forbidden')
        err.status = 403
        return next(err)
    }

    await deleteReviewImage.destroy()

    return res.json({
        message: "Successfully deleted"
    })
})



module.exports = router
