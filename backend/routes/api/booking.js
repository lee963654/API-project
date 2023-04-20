const express = require('express');
const { check } = require("express-validator");
const { Op } = require('sequelize');
const { handleValidationErrors } = require("../../utils/validation");
const { requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, Booking, User, ReviewImage } = require('../../db/models');

const router = express.Router();


// Get all of the current users bookings
router.get('/current', requireAuth, async(req, res) => {
    const booking = await Booking.findAll({
        where: {
            userId: req.user.id
        }
    })

    return res.json(booking)
})







module.export = router
