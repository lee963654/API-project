const express = require('express');
const { Op } = require('sequelize');

const { Spot, SpotImage } = require('../../db/models');

const router = express.Router();


router.get('/', async (req, res) => {
    const spots = await Spot.findAll();
    const spotImages = await SpotImage.findAll();

    let spotsList = []

    // spots.forEach((spot) => {
    //     spotsList.push(spot.toJSON())
    // })
    // console.log(spotsList)


    for (let spot of spots) {
        spotsList.push(spot.toJSON())
    }

    for (let spot of spotsList) {
        const findImage = await SpotImage.findAll({
            where: {
                spotId: spot.id
            }
        })
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
    }


    return res.json(spotsList)
})



module.exports = router
