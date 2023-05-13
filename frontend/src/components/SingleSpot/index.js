import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { singleSpotThunk } from "../../store/spots"
import { singleSpotReviewThunk } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import AddReportModal from "../AddReviewModal";
import DeleteReviewModal from "../DeleteReviewModal";
import "./SingleSpot.css"
import EditReviewModal from "../EditReviewModal";


export default function SingleSpot() {
    const dispatch = useDispatch()
    const { spotId } = useParams()

    const [hasReview, setHasReview] = useState(false)

    // const spot = useSelector((state) => state.spots.singleSpot.spot ? state.spots.singleSpot.spot[spotId] : null)
    const spot = useSelector((state) => state?.spots?.singleSpot?.spot ? state.spots.singleSpot.spot[spotId] : null)
    const currentUserId = useSelector(state => state.session.user ? state.session.user.id : null)

    const spotReviews = useSelector(state => state?.reviews?.Reviews)

    const spotReviewsArr = []
    Object.values(spotReviews).forEach(review => {

        if (review.User) {
            spotReviewsArr.push(
                <div className="user-reviews">
                    <h2>{review.User.firstName}</h2>
                    <h3>{review.createdAt.slice(0, 7)}</h3>
                    <h3>{review.review}</h3>
                    {review.userId === currentUserId && <div>{<OpenModalButton buttonText="Delete" modalComponent={<DeleteReviewModal spotId={spotId} reviewId={review.id} />} />}{<OpenModalButton buttonText="Update" modalComponent={<EditReviewModal editSpotId={spotId} />} />}</div>}
                </div>
            )
        }
    })





    // console.log("this is the spot=========", spot.SpotImages)

    useEffect(() => {
        dispatch(singleSpotThunk(spotId));



    }, [dispatch, spotId]);

    useEffect(() => {
        dispatch(singleSpotReviewThunk(spotId))
    }, [dispatch, spotId, spot])

    // if (!currentUserId) return null
    if (!spot) return null
    if (!spotReviews) return null

    const spotImagesArr = [...spot.SpotImages]
    console.log("SPOT IMAGES ARR", spotImagesArr)
    const test = []
    for (let image of spotImagesArr) {

        test.push(image.url)
    }
    console.log("THIS IS THE TEST ARR", test)



    return (
        <div className="single-spot-container">
            <div className="single-spot">
                <h2>{spot.name}</h2>
                <p>{spot.city}, {spot.state}, {spot.country}</p>
                <div className="image-container">
                    {/* {spot.SpotImages ? spot.SpotImages.map((image) => {
                    return <img key={image.id} src={image.url} alt="spot-images" style={{ width: 400, height: 400 }}></img>
                }) : <h3>No Image Available</h3>} */}
                    <div className="main-image-container"><img className="main-image" src={test[0]} style={{ width: 500, height: 500 }}></img></div>
                    <div className="support-image-container">
                        {test[1] ? <img className="top-left-image" src={test[1]} alt="spot-images" style={{ width: 240, height: 240 }}></img> : <img src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png" style={{ width: 240, height: 240 }}></img>}
                        {test[2] ? <img className="top-right-image" src={test[2]} alt="spot-images" style={{ width: 240, height: 240 }}></img> : <img src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png" style={{ width: 240, height: 240 }}></img>}
                        {test[3] ? <img className="bottom-left-image" src={test[3]} alt="spot-images" style={{ width: 240, height: 240 }}></img> : <img src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png" style={{ width: 240, height: 250 }}></img>}
                        {test[4] ? <img className="bottom-right-image" src={test[4]} alt="spot-images" style={{ width: 240, height: 240 }}></img> : <img src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png" style={{ width: 240, height: 240 }}></img>}
                    </div>
                </div>
                <div className="description-container">
                    <div className="name-description">
                        <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                        <p>{spot.description}</p>
                    </div>
                    <div className="price-info">
                        <div className="price-star-rev">
                            <h2>{spot.price}</h2>
                            <h3>{spot.avgStarRating ? ((spot.avgStarRating).toFixed(2)) : null}</h3>
                            {spot.numReviews === 1 ? <h3>{spot.numReviews} review</h3> : <h3>{spot.numReviews} reviews</h3>}
                        </div>
                        <div className="reserve-button">
                            <button>Reserve</button>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="bottom-review-info">
                        <h2>StarIcon {spot.avgStarRating ? ((spot.avgStarRating).toFixed(2)) : null}</h2>
                        {spot.numReviews === 1 ? <h2>{spot.numReviews} review</h2> : <h2>{spot.numReviews} reviews</h2>}
                    </div>
                    <div key={spot.id} className="user-review-container">
                        {currentUserId && (spot.ownerId !== currentUserId) && <OpenModalButton buttonText="Post Your Review" modalComponent={<AddReportModal spotId={spotId} />} />}
                        {spotReviewsArr.length ? spotReviewsArr : <h3>Be the first to post a review!</h3>}
                    </div>
                </div>
            </div>
        </div>
    )
}
