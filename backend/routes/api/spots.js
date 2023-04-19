const express = require('express');
const { Op } = require('sequelize');

const { Spot, SpotImage, Review, Booking, User } = require('../../db/models');

const router = express.Router();




router.get('/', async (req, res) => {
    const spots = await Spot.findAll();
    const spotImages = await SpotImage.findAll();

    let spotsList = []
    let stars = 0
    let count = 0



    for (let spot of spots) {
        spotsList.push(spot.toJSON())
    }

    for (let spot of spotsList) {
        const findImage = await SpotImage.findAll({
            where: {
                spotId: spot.id
            }
        })

        const findStars = await Review.findAll({
            where: {
                spotId: spot.id
            }
        })

        for (let star of findStars) {
            star.toJSON()
            stars = stars + star.stars
            count = count + 1
        }

        for (let image of findImage) {
            image.toJSON()
            if (image.preview) {
                spot.previewImage = image.url
            } else {
                spot.previewImage = "No Image Available"
            }
        }


        if (!spot.previewImage) {
            spot.previewImage = "No Image Available"
        }

        if (count > 0) {
            spot.avgRating = stars / count
            stars = 0
            count = 0
        } else {
            spot.avgRating = "No Rating Available"
            stars = 0
            count = 0
        }
    }


    return res.json({
        Spots: spotsList
    })
})


router.get('/current', async (req, res) => {
    console.log(req.user.id)
    let userSpot = []

    const spot = await Spot.findAll({
        where: {
            ownerId: req.user.id
        }
    })


    const reviews = await Review.findAll()


    return res.json(userSpot)
})


module.exports = router
