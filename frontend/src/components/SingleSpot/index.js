import React, {useEffect} from "react"
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { singleSpotThunk } from "../../store/spots"
import { singleSpotReviewThunk } from "../../store/reviews";
import "./SingleSpot.css"


export default function SingleSpot () {
    const dispatch = useDispatch()
    const { spotId } = useParams()

    const spot = useSelector((state) => state.spots.singleSpot ? state.spots.singleSpot[spotId] : null)
    console.log("this is the spot=====", spot)

    const spotReviews = useSelector(state => state.reviews.Reviews)
    console.log("this is the reviews====", spotReviews)
    const spotReviewsArr = []
    Object.values(spotReviews).forEach(review => {

        spotReviewsArr.push(
            <>
                <h2>{review.User.firstName}</h2>
                <h3>{review.createdAt}</h3>
                <h3>{review.review}</h3>
            </>
        )
    })



    useEffect(() => {
        dispatch(singleSpotThunk(spotId));

        dispatch(singleSpotReviewThunk(spotId))


      }, [dispatch, spotId]);

    if(!spot) return null

    return (
        <div className="single-spot-container">
            <h2>{spot.name}</h2>
            <p>{spot.city}, {spot.state}, {spot.country}</p>
            <div>
                {spot.SpotImages ? spot.SpotImages.map((image) => {
                    return <img key={image.id} src={image.url} alt="spot-images" style={{width: 400, height: 400}}></img>
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
                <div key={spot.id}>
                    {spotReviewsArr.length ? spotReviewsArr : <h3>No Reviews</h3>}
                </div>
            </div>
        </div>
    )
}
