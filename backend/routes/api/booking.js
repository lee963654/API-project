const express = require('express');
const { check } = require("express-validator");
const { Op } = require('sequelize');
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, Booking, User, ReviewImage } = require('../../db/models');

const router = express.Router();


// Get all of the current users bookings
router.get('/current', requireAuth, async(req, res) => {

    let results = []

    const booking = await Booking.scope('showAll').findAll({
        where: {
            userId: req.user.id
        },
    })

    for (let ele of booking) {
        let findSpot = await ele.getSpot({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'description']
            }
        })
        ele = ele.toJSON()
        findSpot = findSpot.toJSON()
        const previewImg = await SpotImage.findAll({
            where: {
                spotId: findSpot.id
            }
        })
        for (let image of previewImg) {
            image = image.toJSON()
            if (image.preview) {
                findSpot.previewImage = image.url
            }
        }
        if (!findSpot.previewImage) {
            findSpot.previewImage = "No image available"
        }

        ele.Spot = findSpot
        results.push(ele)
    }




    return res.json({
        Bookings: results
    })
})







module.exports = router
