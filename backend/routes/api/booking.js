const express = require('express');
const { check } = require("express-validator");
const { Op } = require('sequelize');
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, Booking, User, ReviewImage } = require('../../db/models');

const router = express.Router();


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


// Edit a booking
router.put('/:bookingId', requireAuth, validateBookings, async(req, res, next) => {
    const { startDate, endDate } = req.body

    const editBooking = await Booking.scope('showAll').findOne({
        where: {
            id: req.params.bookingId
        }
    })

    if (!editBooking) {
        const err = new Error("Booking couldn't be found")
        err.status = 404
        return next(err)
    }

    const allBookings = await Booking.scope('showAll').findAll({
        where: {
            spotId: editBooking.spotId
        }
    })


    if (editBooking.userId !== req.user.id) {
        const err = new Error("forbidden")
        err.status = 403
        return next(err)
    }

    if (Date.parse(editBooking.startDate) < Date.parse(new Date())) {
        const err = new Error("Past bookings can't be modified")
        err.status = 403
        return next(err)
    }

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

    for (let booking of allBookings) {
        booking.toJSON()
        const startBooking = Date.parse(booking.startDate)
        const endBooking = Date.parse(booking.endDate)

        if ((Date.parse(startDate) >= startBooking) && (Date.parse(startDate) <= endBooking) && (Date.parse(endDate) >= startBooking) && (Date.parse(endDate) <= endBooking)) {
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

    if (startDate !== undefined) editBooking.startDate = startDate
    if (endDate !== undefined) editBooking.endDate = endDate


    return res.json(editBooking)
})


// Delete a booking
router.delete('/:bookingId', requireAuth, async(req, res, next) => {
    const deleteBooking = await Booking.findOne({
        where: {
            id: req.params.bookingId
        }
    })

    if (!deleteBooking) {
        const err = new Error("Booking couldn't be found")
        err.status = 404
        return next(err)
    }

    if (deleteBooking.userId !== req.user.id) {
        const err = new Error("forbidden")
        err.status = 403
        return next(err)
    }

    if (Date.parse(deleteBooking.startDate) <= Date.parse(new Date()) && Date.parse(deleteBooking.endDate) >= Date.parse(new Date())) {
        const err = new Error("Bookings that have been started can't be deleted")
        err.status = 403
        return next(err)
    }

    await deleteBooking.destroy()

    return res.json({
        message: "Successfully deleted"
    })

})


module.exports = router
