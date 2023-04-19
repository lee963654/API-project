const express = require('express');
const { check } = require("express-validator");
const { Op } = require('sequelize');
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth, authorization } = require('../../utils/auth');
const { Spot, SpotImage, Review, Booking, User, ReviewImage } = require('../../db/models');
const router = express.Router();




// add an image to a review based on the review id
router.post('/:reviewId/images', requireAuth, async(req, res, next) => {
    const { url } = req.body
    const review = await Review.findOne({
        where: {
            id: req.params.reviewId
        }
    })
    const numImages = await review.getReviewImages()

    if (numImages.length >= 10) {
        const err = new Error("Maximum number of images for this resource was reached")
        err.status = 403
        return next(err)
    }

    if (!review) {
        const err = new Error("Review couldn't be found")
        err.status = 404
        return next(err)
    }

    const newReviewImage = await ReviewImage.create({
        reviewId: review.id,
        url,
    })

    return res.json({
        id: newReviewImage.id,
        url: newReviewImage.url
    })
})




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


// Delete a Review
router.delete('/:reviewId', requireAuth, async(req, res, next) => {
    const deleteReview = await Review.findOne({
        where: {
            id: req.params.reviewId
        }
    })

    if (!deleteReview) {
        const err = new Error("Review couldn't be found")
        err.status = 404
        return next(err)
    }

    if (parseInt(deleteReview.userId) !== parseInt(req.user.id)) {
        const err = new Error("Forbidden")
        err.status = 403
        return next(err)
    }

    await deleteReview.destroy()

    return res.json({
        message: "Successfully deleted"
    })

})








module.exports = router
