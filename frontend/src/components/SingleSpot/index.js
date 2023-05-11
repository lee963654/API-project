import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { singleSpotThunk } from "../../store/spots"
import { singleSpotReviewThunk } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import AddReportModal from "../AddReviewModal";
import DeleteReviewModal from "../DeleteReviewModal";
import "./SingleSpot.css"


export default function SingleSpot() {
    const dispatch = useDispatch()
    const { spotId } = useParams()

    const [hasReview, setHasReview] = useState(false)

    // const spot = useSelector((state) => state.spots.singleSpot.spot ? state.spots.singleSpot.spot[spotId] : null)
    const spot = useSelector((state) => state.spots.singleSpot.spot ? state.spots.singleSpot.spot[spotId] : null)
    console.log("this is the spot", spot)
    const currentUserId = useSelector(state => state.session.user.id)






    const spotReviews = useSelector(state => state.reviews.Reviews)

    const spotReviewsArr = []
    Object.values(spotReviews).forEach(review => {
        console.log("This is the review", review)

        console.log(hasReview)
        if (review.User) {
        spotReviewsArr.push(
            <div className="user-reviews">
                <h2>{review.User.firstName}</h2>
                <h3>{review.createdAt.slice(0, 7)}</h3>
                <h3>{review.review}</h3>
                {review.userId === currentUserId && <div>{<OpenModalButton buttonText="Delete" modalComponent={<DeleteReviewModal reviewId={review.id}/>}/>}<button>Update</button></div>}
            </div>
        )
        }
    })



    useEffect(() => {
        dispatch(singleSpotThunk(spotId));

        // dispatch(singleSpotReviewThunk(spotId))

        // Object.values(spotReviews).forEach(review => {
        //     if (review.User.id === currentUserId) setHasReview(true)
        // })


    }, [dispatch, spotId]);

    useEffect(() => {
        dispatch(singleSpotReviewThunk(spotId))
    }, [dispatch, spotId, spot])

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
                    {spot.ownerId !== currentUserId && <OpenModalButton buttonText="Post Your Review" modalComponent={<AddReportModal spotId={spotId} />}/>}
                    {spotReviewsArr.length ? spotReviewsArr : <h3>Be the first to post a review!</h3>}
                </div>
            </div>
        </div>
    )
}
