import React, {useEffect} from "react"
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { singleSpotThunk, singleSpotReviewThunk } from "../../store/spots"
import "./SingleSpot.css"


export default function SingleSpot () {
    const dispatch = useDispatch()
    const { spotId } = useParams()

    const spot = useSelector((state) => state.spots.singleSpot ? state.spots.singleSpot[spotId] : null)

    const spotReviews = useSelector(state => state.spots.singleSpot.review)

    const spotReviewsArr = Object.values(spotReviews)




    const currentSpotReviewsArr = []
    // spotReviewsArr.forEach((review) => {
    //     console.log("review========", review)
    //     console.log("current spotId====", spotId)
    //     if (review.spotId === spotId) currentSpotReviewsArr.push(
    //         <div>
    //             <p>{review.User.firstName}</p>
    //             <p>{review.createdAt}</p>
    //             <p>{review.review}</p>
    //         </div>
    //     )
    // })
    for (let review of spotReviewsArr) {

        if (review.spotId === parseInt(spotId)) {
            currentSpotReviewsArr.push(
            <div>
                <p>{review.User.firstName}</p>
                <p>{review.createdAt}</p>
                <p>{review.review}</p>
             </div>
            )
        }

    }



    useEffect(() => {
        dispatch(singleSpotThunk(spotId));

        dispatch(singleSpotReviewThunk(spotId))


      }, [dispatch, spotId]);

    if(!spot) return null

    return (
        <div>
            <h2>{spot.name}</h2>
            <p>{spot.city}, {spot.state}, {spot.country}</p>
            <div>
                {spot.SpotImages.map((image) => {
                    return <img key={image.id} src={image.url} alt="spot-images" style={{width: 400, height: 400}}></img>
                })}
            </div>
            <div>
                <div>
                    <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    <p>{spot.description}</p>
                </div>
                <div>
                    <h2>{spot.price}</h2>
                    <h3>{spot.avgStarRating}</h3>
                    <h3>{spot.numReviews} review(s)</h3>
                    <button>Reserve</button>
                </div>
            </div>
            <div>
                <h2>{spot.avgStarRating}</h2>
                <h2>{spot.numReviews} review(s)</h2>
                <div key={spot.id}>
                    {currentSpotReviewsArr && currentSpotReviewsArr}
                </div>
            </div>
        </div>
    )
}
