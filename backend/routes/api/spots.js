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
            }
            // } else {
            //     spot.previewImage = "No Image Available"
            // }
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
    let count = 0
    let stars = 0

    const spot = await Spot.findAll({
        where: {
            ownerId: req.user.id
        }
    })

    spot.forEach((ele) => {
        userSpot.push(ele.toJSON())
    })

    for (let ele of userSpot) {
        const userStar = await Review.findAll({
            where: {
                spotId: ele.id
            }
        })
        const previewImage = await SpotImage.findAll({
            where: {
                spotId: ele.id
            }
        })
        for (let image of previewImage) {
            image.toJSON()
            if (ele.preview) {
                ele.previewImage = image.url
            }
            // } else {
            //     ele.previewImage = "No Image Available"
            // }
        }
        for (let star of userStar) {
            star.toJSON()
            stars = stars + star.stars
            count = count + 1
        }

        if (count > 0) {
            ele.avgRating = stars / count
            count = 0
            stars = 0
        } else {
            ele.avgRating = "No Rating Available"
        }

        if (!ele.previewImage) ele.previewImage = "No Image Available"

    }

    return res.json({
        Spots: userSpot
    })
})


router.get('/:spotId', async (req, res, next) => {

    let spotArr = []

    const spot = await Spot.findAll({
        where: {
            id: req.params.spotId
        },
        include: [
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                as: 'Owner',
                attributes: ['id', 'firstName', 'lastName']
            }
        ]

    })

    const numReviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        }
    })



    // console.log("length=========", numReviews.length)

    spot.forEach((ele) => {
        spotArr.push(ele.toJSON())
    })

    let reviews = 0
    let count = 0
    let stars = 0

    for (let spot of spotArr) {
        for (let review of numReviews) {
            if (review) {
                reviews = reviews + 1
                stars = stars + review.stars
                count = count + 1
            }
        }
        spot.numReviews = reviews
        reviews = 0

        if (count) {
            spot.avgStarRating = stars / count
            count = 0
            stars = 0
        } else {
            spot.aveStarRating = "No Rating Available"
        }

    }



    console.log(spot)
    if (!spot.length) {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        return next(err)
    }


    return res.json(spotArr)
})


module.exports = router
