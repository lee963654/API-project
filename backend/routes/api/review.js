const express = require('express');
const { check } = require("express-validator");
const { Op } = require('sequelize');
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth, authorization } = require('../../utils/auth');
const { Spot, SpotImage, Review, Booking, User, ReviewImage } = require('../../db/models');
const router = express.Router();









// get all reviews of the current user
router.get('/current', requireAuth, async(req, res) => {

    const returnReview = []

    const review = await Review.findAll({
        where: {
            userId: req.user.id
        }

    });

    for (let ele of review) {
        // ele = ele.toJSON()
        const spot = await ele.getSpot()
        const reviewImage = await ele.getReviewImages()
        const user = await ele.getUser()
        console.log(user)
        ele = ele.toJSON()

        const ReviewImages = []

        for (let image of reviewImage) {
            image = image.toJSON()

            ReviewImages.push({
                id: image.id,
                url: image.url
            })
        }

        const User = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName
        }

        const Spot = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            price: spot.price,
        }



        ele.Spot = Spot
        ele.User = User
        ele.ReviewImages = ReviewImages
        returnReview.push(ele)

    }




    return res.json({ Reviews: returnReview })
})











module.exports = router
