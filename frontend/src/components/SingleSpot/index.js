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

    const monthObj = {
        "01": "January",
        "02": "February",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December"
    }

    const dispatch = useDispatch()
    const { spotId } = useParams()

    // const [hasReview, setHasReview] = useState(false)

    // const spot = useSelector((state) => state.spots.singleSpot.spot ? state.spots.singleSpot.spot[spotId] : null)
    const spot = useSelector((state) => state?.spots?.singleSpot?.spot ? state.spots.singleSpot.spot[spotId] : null)
    const currentUserId = useSelector(state => state.session.user ? state.session.user.id : null)

    const spotReviews = useSelector(state => state?.reviews?.Reviews)



//TESTING TESTING



console.log("THIS IS THE CURRENT USER", currentUserId)
console.log("THESE ARE THE SPOTREVIEWS", spotReviews)

const testReviews = Object.values(spotReviews)


const orderReviews = testReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

    const spotReviewsArr = []
    orderReviews.forEach(review => {
        console.log("THIS IS THE REVIEW IN THE FOREACH", review)

        //testing
        // if (review.userId === currentUserId) setHasReview(true)
        //testing

        if (review.User) {
            spotReviewsArr.push(
                <div className="user-reviews">
                    <h3>{review.User.firstName}</h3>
                    {/* <h4>{review.createdAt.slice(0, 7)}</h4> */}
                    <h4>{monthObj[review.createdAt.slice(5, 7)]} {review.createdAt.slice(0, 4)}</h4>
                    <p>{review.review}</p>
                    {review.userId === currentUserId && <div className="user-review-buttons">{<OpenModalButton buttonText="Delete" modalComponent={<DeleteReviewModal spotId={spotId} reviewId={review.id} />} />}{<OpenModalButton buttonText="Update" modalComponent={<EditReviewModal editSpotId={spotId} />} />}</div>}
                </div>
            )
        }
    })
//TESTING TESTING



let hasReview;

for (let review of orderReviews) {
    if (review.userId === currentUserId) hasReview = "hasReview"
}









    // THIS WORKS
    // const spotReviewsArr = []
    // Object.values(spotReviews).forEach(review => {
    //     console.log("Slicing the dates", review.createdAt)
    //     if (review.User) {
    //         spotReviewsArr.push(
    //             <div className="user-reviews">
    //                 <h3>{review.User.firstName}</h3>
    //                 {/* <h4>{review.createdAt.slice(0, 7)}</h4> */}
    //                 <h4>{monthObj[review.createdAt.slice(5, 7)]} {review.createdAt.slice(0, 4)}</h4>
    //                 <p>{review.review}</p>
    //                 {review.userId === currentUserId && <div>{<OpenModalButton buttonText="Delete" modalComponent={<DeleteReviewModal spotId={spotId} reviewId={review.id} />} />}{<OpenModalButton buttonText="Update" modalComponent={<EditReviewModal editSpotId={spotId} />} />}</div>}
    //             </div>
    //         )
    //     }
    // })
    // THIS WORKS













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

    const test = []
    for (let image of spotImagesArr) {

        test.push(image.url)
    }




    return (
        <div className="single-spot-container">
            <div className="single-spot">
                <h1>{spot.name}</h1>
                <h3>{spot.city}, {spot.state}, {spot.country}</h3>
                <div className="image-container">
                    {/* {spot.SpotImages ? spot.SpotImages.map((image) => {
                    return <img key={image.id} src={image.url} alt="spot-images" style={{ width: 400, height: 400 }}></img>
                }) : <h3>No Image Available</h3>} */}
                    <div className="main-image-container"><img alt="spot-img" className="main-image" src={test[0]} style={{ width: 494, height: 494 }}></img></div>
                    <div className="support-image-container">
                        {test[1] ? <img className="top-left-image" src={test[1]} alt="spot-images-one" style={{ width: 242, height: 242 }}></img> : <img src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png" style={{ width: 242, height: 242 }}></img>}
                        {test[2] ? <img className="top-right-image" src={test[2]} alt="spot-images" style={{ width: 242, height: 242 }}></img> : <img src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png" style={{ width: 242, height: 242 }}></img>}
                        {test[3] ? <img className="bottom-left-image" src={test[3]} alt="spot-images" style={{ width: 242, height: 242 }}></img> : <img src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png" style={{ width: 242, height: 242 }}></img>}
                        {test[4] ? <img className="bottom-right-image" src={test[4]} alt="spot-images" style={{ width: 242, height: 242 }}></img> : <img src="https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png" style={{ width: 242, height: 242 }}></img>}
                    </div>
                </div>
                <div className="description-container">
                    <div className="name-description">
                        <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                        <p>{spot.description}</p>
                    </div>
                    <div className="price-info">
                        <div className="price-star-rev">
                            <p><span className="price">${spot.price}</span> night</p>
                            <div className="star-and-reviews">
                                {/* <p><i class="fa-sharp fa-solid fa-star"></i> {spot.avgStarRating ? ((spot.avgStarRating).toFixed(2)) : null}</p>
                                {spot.numReviews === 1 ? <p>{spot.numReviews} review</p> : <p>{spot.numReviews} reviews</p>} */}
                                {spot.avgStarRating > 0 ? <p><i class="fa-sharp fa-solid fa-star"></i> {spot.avgStarRating.toFixed(2)}</p> : null}
                                {spot.numReviews > 1 ? <p className="review-list-item">{spot.numReviews} reviews</p> : spot.numReviews === 1 ? <p className="review-list-item">{spot.numReviews} review</p> : <p className="new-spot-no-rating"><i class="fa-sharp fa-solid fa-star"></i> New</p>}
                            </div>
                        </div>
                        <div className="reserve-button-container">
                            <button className="reserve-button" onClick={() => alert('Feature Coming Soon!')}>Reserve</button>
                        </div>
                    </div>
                </div>
                <div className="bottom-review-container">
                    <div className="bottom-review-info">
                        <h2><i class="fa-sharp fa-solid fa-star fa-xl"></i> {spot.avgStarRating ? ((spot.avgStarRating).toFixed(2)) : null}</h2>
                        {/* {spot.numReviews === 1 ? <h2 className="bottom-review">{spot.numReviews} review</h2> : <h2 className="bottom-review">{spot.numReviews} reviews</h2>} */}
                        {spot.numReviews > 1 ? <h2 className="bottom-review">{spot.numReviews} reviews</h2> : spot.numReviews === 1 ? <h2 className="bottom-review">{spot.numReviews} review</h2> : <h2 classNmae="bottom-review">New</h2>}
                    </div>
                    <div key={spot.id} className="user-review-container">
                        {currentUserId && (spot.ownerId !== currentUserId) && (hasReview !== "hasReview") && <OpenModalButton buttonText="Post Your Review" modalComponent={<AddReportModal spotId={spotId} />} />}
                        {spotReviewsArr.length ? spotReviewsArr : <h3>Be the first to post a review!</h3>}
                    </div>
                </div>
            </div>
        </div>
    )
}
