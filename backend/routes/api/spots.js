const express = require('express');
const { Op } = require('sequelize');

const { requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");

const { Spot, SpotImage, Review, Booking, User } = require('../../db/models');

const router = express.Router();



// validateCreateSpot
const validateCreateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true})
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true})
        .isFloat({ min: -90, max: 90})
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true})
        .isFloat({ min: -180, max:180})
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true})
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('name')
        .exists({ checkFalsy: true})
        .withMessage('Name is not valid'),
    check('description')
        .exists({ checkFalsy: true})
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true})
        .withMessage('Price per day is required'),
        handleValidationErrors
];

// Validate review
const validateCreateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isFloat({min: 1, max: 5})
        .withMessage('Stars must be an integer from 1 to 5'),
    check('stars')
        .exists({ checkFalsy: true })
        .withMessage('Stars is required'),
        handleValidationErrors
]

// Validate bookings
const validateBookings = [
    check('startDate')
        .exists({ checkFalsy: true})
        .withMessage("startDate required"),
    check("startDate")
        .isDate()
        .withMessage("startDate must be a valid date"),
    check("endDate")
        .exists({ checkFalsy: true})
        .withMessage("endDate required"),
    check("endDate")
        .isDate()
        .withMessage("endDate must be a valid date"),
        handleValidationErrors
]

// const validateQuery = [
//     query('page')
//         .isFloat({ min: 1, max: 10 })
//         .withMessage("Page must be greater than or equal to 1"),
//     query('size')
//         .isFloat({ min: 1, max: 20 })
//         .withMessage("Size must be greater than or equal to 1"),

// ]


// Create a booking from a spot based on the spots id
router.post('/:spotId/bookings', requireAuth, validateBookings, async(req, res, next) => {
    const { startDate, endDate } = req.body


    let newStartDate = Date.parse(startDate)
    let newEndDate = Date.parse(endDate)

    if (Date.parse(endDate) < Date.parse(startDate)) {
        const err = new Error('Bad Request')
        err.status = 400
        errors = {
            endDate: "endDate cannot be on or before startDate"
        }
        err.errors = errors
        return next(err)
    }

    if (Date.parse(startDate) < Date.parse(new Date())) {
        const err = new Error("Bad Request")
        err.status = 400
        errors = {
            startDate: "startDate cannot be before today's date"
        }
        err.errors = errors
        return next(err)
    }

    const currentSpot = await Spot.findOne({
        where: {
            id: req.params.spotId
        }
    })

    if (!currentSpot) {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        return next(err)
    }

    if (currentSpot.ownerId === req.user.id) {
        const err = new Error('forbidden')
        err.status = 403
        return next(err)
    }

    const currentBookings = await Booking.scope('showAll').findAll({
        where: {
            spotId: req.params.spotId
        }
    })

    for (let booking of currentBookings) {
        booking = booking.toJSON()
        const startBooking = Date.parse(booking.startDate)
        const endBooking = Date.parse(booking.endDate)


        if (((Date.parse(startDate) >= startBooking) && (Date.parse(startDate) <= endBooking) && (Date.parse(endDate) >= startBooking) && (Date.parse(endDate) <= endBooking)) || (Date.parse(startDate) <= startBooking && Date.parse(endDate) > endBooking)) {
            const err = new Error('Sorry, this spot is already booked for the specified dates')
            err.status = 403
            errors = {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
            err.errors = errors
            return next(err)
        } else if (Date.parse(endDate) >= startBooking && Date.parse(endDate) <= endBooking) {
            const err = new Error('Sorry, this spot is already booked for the specified dates')
            err.status = 403
            errors = {
                endDate: "End date conflicts with an existing booking"
            }
            err.errors = errors
            return next(err)
        } else if (Date.parse(startDate) >= startBooking && Date.parse(startDate) <= endBooking) {
            const err = new Error('Sorry, this spot is already booked for the specified dates')
            err.status = 403
            errors = {
                startDate: "Start date conflicts with an existing booking"
            }
            err.errors = errors
            return next(err)
        }

    }

    const newBooking = await Booking.create({
        spotId: currentSpot.id,
        userId: req.user.id,
        startDate,
        endDate,
    })

    const result = await Booking.findOne({
        where: {
            spotId: currentSpot.id,
            userId: req.user.id,
            startDate,
            endDate,
        },
        attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt']
    })


    return res.json(result)

})



// get all bookings for a spot based on the spots id
router.get('/:spotId/bookings', requireAuth, async(req, res, next) => {

    let ownerRes = []


    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId
        }
    })

    if (!spot) {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        return next(err)
    }


    const booking = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        },
        attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt']

    })

    if (!booking.length) {
        const err = new Error("This spot has no bookings")
        err.status = 404
        return next(err)
    }


    if (spot.ownerId !== req.user.id) {
        const notOwner = await Booking.findAll({
            where: {
                spotId: req.params.spotId
            },
            attributes: ['spotId', 'startDate', 'endDate']
        })

        return res.json({
            Bookings: notOwner
        })

    } else {
        const currentUser = await User.findOne({
            where: {
                id: req.user.id
            },
            attributes: ['id', 'firstName', 'lastName']
        })

        for (let ele of booking) {
            ele = ele.toJSON()
            ele.User = currentUser

            ownerRes.push(ele)
        }
    }

    return res.json({
        Bookings: ownerRes
    })




})



// Create a review for a spot based on the spots id
router.post('/:spotId/reviews', requireAuth, validateCreateReview, async(req, res, next) => {
    const { review, stars } = req.body

    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId
        }
    })

    if (!spot) {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        return next(err)
    }


    const findReview = await spot.getReviews({
        where: {
            userId: req.user.id
        }
    })

    if (findReview.length) {
        const err = new Error("User already has a review for this spot")
        err.status = 500
        return next(err)
    }

    const newReview = await Review.create({
        userId: req.user.id,
        spotId: parseInt(req.params.spotId),
        review,
        stars,
    })

    return res.status(201).json(newReview)

})



// Get all reviews by a Spot id
router.get('/:spotId/reviews', async(req, res, next) => {

    const result = []

    const review = await Review.findAll({
        where: {
            spotId: req.params.spotId
        }
    })

    const testSpot = await Spot.findOne({
        where: {
            id: req.params.spotId
        }
    })

    if (!review.length && testSpot) {
        const err = new Error("This spot has no reviews")
        err.status = 404
        return next(err)
    }

    if (!review.length) {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        return next(err)
    }

    for (let ele of review) {
        const user = await ele.getUser()
        const reviewImage = await ele.getReviewImages()
        ele = ele.toJSON()

        const reviewImg = []

        for (let image of reviewImage) {
            reviewImg.push({
                id: image.id,
                url: image.url
            })
        }

        const User = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName
        }

        ele.ReviewImages = reviewImg
        ele.User = User
        result.push(ele)

    }

    return res.json({
        Review: result
    })
})





// Get All Spots
router.get('/', async (req, res, next) => {
    const errors = {}

    const spotImages = await SpotImage.findAll();
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query


    if (!page) page = 1
    if (!size) size = 20
    page = parseInt(page)
    size = parseInt(size)


    if (page && (page < 1 || isNaN(page) || page > 10)) {
        errors.page = "Page must be greater than or equal to 1 and less than or equal to 10"
    }
    if (size && (size < 1 || isNaN(size) || size > 20)) {
        errors.size = "Size must be greater than or equal to 1 and less than or equal to 20"
    }
    if (minLat && (minLat < -90 || minLat > 90 || isNaN(minLat))) {
        errors.minLat = "Minimum latitude is invalid"
    }
    if (maxLat && (maxLat > 90 || maxLat < -90 || isNaN(maxLat))) {
        errors.maxLat = "Maximum latitude is invalid"
    }
    if (minLng && (minLng < -180 || minLng > 180 || isNaN(minLng))) {
        errors.minLng = "Minimum longitude is invalid"
    }
    if (maxLng && (maxLng > 180 || maxLng < -180 || isNaN(maxLng))) {
        errors.maxLng = "Maximum longitude is invalid"
    }
    if (minPrice && minPrice < 0) {
        errors.minPrice = "Minimum price must be greater than or equal to 0"
    }
    if (maxPrice && maxPrice < 0) {
        errors.maxPrice = "Maximum price must be greater than or equal to 0"
    }
    if (Object.keys(errors).length) {
        const err = new Error("Bad Request")
        err.status = 400
        err.errors = errors
        return next(err)
    }

    const where = {}
    minLat = Number.parseFloat(minLat)
    maxLat = Number.parseFloat(maxLat)

    if (minLat && maxLat) {
        where.lat = {[Op.between]: [minLat, maxLat]}
    } else if (minLat) {
        minLat = Number.parseFloat(minLat)
        where.lat = {[Op.gte]: minLat}
    } else if (maxLat) {
        maxLat = Number.parseFloat(maxLat)
        where.lat = {[Op.lte]: maxLat}
    }
    if (minLng && maxLng) {
        minLng = Number.parseFloat(minLng)
        maxLng = Number.parseFloat(maxLng)
        where.lng = {[Op.between]: [minLng, maxLng]}
    } else if (minLng) {
        minLng = Number.parseFloat(minLng)
        where.lng = {[Op.gte]: minLng}
    } else if (maxLng) {
        maxLng = Number.parseFloat(maxLng)
        where.lng = {[Op.lte]: maxLng}
    }
    if (minPrice && maxPrice) {
        minPrice = Number.parseFloat(minPrice)
        maxPrice = Number.parseFloat(maxPrice)
        where.price = {[Op.between]: [minPrice, maxPrice]}
    } else if (minPrice) {
        minPrice = Number.parseFloat(minPrice)
        where.price = {[Op.gte]: minPrice}
    } else if (maxPrice) {
        maxPrice = Number.parseFloat(maxPrice)
        where.price = {[Op.lte]: maxPrice}
    }




    const pagination = {}

    if (page && size) {
        pagination.limit = size
        pagination.offset = size * (page - 1)
    }





// TESTING =======================================
    // const spots = await Spot.findAll({

    // })

    // for (let spot of spots) {
    //     console.log(await spot.getSpotImages())
    //     spot = spot.toJSON()

    // }

    // return res.json(spots)
// TESTING ==========================================



const spots = await Spot.findAll({
    where: where,
    ...pagination
});

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
        Spots: spotsList,
        page: page || 1,
        size,
    })
})

// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
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

// Get details of a spot from an id
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


    return res.json(spotArr[0])
})



// Create a Spot
router.post('/', requireAuth, validateCreateSpot, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const currentSpot = await Spot.findOne({
        where: {
            address: address
        }
    })

    if (currentSpot) {
        const err = new Error('A spot with that address already exists')
        err.status = 400
        return next(err)
    }

    const spot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
    })

    return res.status(201).json(spot)

})


// Add an image to a spot based on the spot's id
router.post('/:spotId/images', requireAuth, async(req, res, next) => {
    const { url, preview } = req.body

    const currentSpot = await Spot.findOne({
        where: {
            id: req.params.spotId
        }
    })

    if (!currentSpot) {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        return next(err)
    }

    if (req.user.id !== currentSpot.ownerId) {
        const err = new Error('Forbidden')
        err.status = 403
        return next(err)
    }

    const newImage = await SpotImage.create({
        spotId: req.params.spotId,
        url,
        preview,
    })

    return res.json({
        id: newImage.id,
        url: newImage.url,
        preview: newImage.preview
    })
})


// Edit a spot
router.put('/:spotId', requireAuth, validateCreateSpot, async(req, res, next) => {

    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const updateSpot = await Spot.findOne({
        where: {
            id: req.params.spotId
        }
    })


    if (!updateSpot) {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        return next(err)
    }


    if (parseInt(req.user.id) !== parseInt(updateSpot.ownerId)) {
        const err = new Error("Forbidden")
        err.status = 403
        return next(err)
    }

    if (address !== undefined) updateSpot.address = address
    if (city !== undefined) updateSpot.city = city
    if (state !== undefined) updateSpot.state = state
    if (country !== undefined) updateSpot.country = country
    if (lat !== undefined) updateSpot.lat = lat
    if (lng !== undefined) updateSpot.lng = lng
    if (name !== undefined) updateSpot.name = name
    if (description !== undefined) updateSpot.description = description
    if (price !== undefined) updateSpot.price = price



    return res.json(updateSpot)

})


// delete a spot
router.delete('/:spotId', requireAuth, async(req, res, next) => {
    const deleteSpot = await Spot.findOne({
        where: {
            id: req.params.spotId
        }
    })

    if (!deleteSpot) {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        return next(err)
    }

    if (parseInt(req.user.id) !== parseInt(deleteSpot.ownerId)) {
        const err = new Error("Forbidden")
        err.status = 403
        return next(err)
    }

    await deleteSpot.destroy()

    return res.json({
        message: "Successfully deleted"
    })
})



module.exports = router
// module.exports = validateCreateReview
