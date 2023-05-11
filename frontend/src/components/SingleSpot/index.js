import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { singleSpotThunk } from "../../store/spots"
import { singleSpotReviewThunk } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import AddReportModal from "../AddReviewModal";
import "./SingleSpot.css"


export default function SingleSpot() {
    const dispatch = useDispatch()
    const { spotId } = useParams()



    // const spot = useSelector((state) => state.spots.singleSpot.spot ? state.spots.singleSpot.spot[spotId] : null)
    const spot = useSelector((state) => state.spots.singleSpot.spot ? state.spots.singleSpot.spot[spotId] : null)
    console.log("this is the spot", spot)
    const currentUserId = useSelector(state => state.session.user.id)
    console.log("this is the user", currentUserId)
    const userSpot = useSelector(state => state.spots.singleSpot.spot[spotId])
    console.log("this is the spotId", userSpot)




    const spotReviews = useSelector(state => state.reviews.Reviews)

    const spotReviewsArr = []
    Object.values(spotReviews).forEach(review => {


        spotReviewsArr.push(
            <div className="user-reviews">
                <h2>{review.User.firstName}</h2>
                <h3>{review.createdAt.slice(0, 7)}</h3>
                <h3>{review.review}</h3>
            </div>
        )
    })



    useEffect(() => {
        dispatch(singleSpotThunk(spotId));

        dispatch(singleSpotReviewThunk(spotId))


    }, [dispatch, spotId]);

    if (!spot) return null
    if (!spotReviews) return null

    return (
        <div className="single-spot-container">
            <h2>{spot.name}</h2>
            <p>{spot.city}, {spot.state}, {spot.country}</p>
            <div>
                {spot.SpotImages ? spot.SpotImages.map((image) => {
                    return <img key={image.id} src={image.url} alt="spot-images" style={{ width: 400, height: 400 }}></img>
                }) : <h3>No Image Available</h3>}
            </div>
            <div className="description-container">
                <div className="name-description">
                    <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    <p>{spot.description}</p>
                </div>
                <div className="price-info">
                    <div className="price-star-rev">
                        <h2>{spot.price}</h2>
                        <h3>{spot.avgStarRating}</h3>
                        <h3>{spot.numReviews} review(s)</h3>
                    </div>
                    <div className="reserve-button">
                        <button>Reserve</button>
                    </div>
                </div>
            </div>
            <div>
                <div className="bottom-review-info">
                    <h2>StarIcon {spot.avgStarRating} : {spot.numReviews} review(s)</h2>
                </div>
                <div key={spot.id} className="user-review-container">
                    {<OpenModalButton buttonText="Post Your Review" modalComponent={<AddReportModal spotId={spotId} />}/>}
                    {spotReviewsArr.length ? spotReviewsArr : <h3>Be the first to post a review!</h3>}
                </div>
            </div>
        </div>
    )
}
