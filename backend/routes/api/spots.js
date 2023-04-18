const express = require('express');
const { Op } = require('sequelize');

const { Spot, SpotImage, Review, Booking } = require('../../db/models');

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

        spot.avgRating = stars / count
        stars = 0
        count = 0
    }


    return res.json(spotsList)
})


router.get('/current', async (req, res) => {
    console.log(req.user.id)

    const userSpot = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        include: [
            {
                model: SpotImage
            },
            {
                model: Review
            },
            {
                model: Booking
            }
        ]
    })

    const reviews = await Review.findAll()


    return res.json(userSpot)
})


module.exports = router
