import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { userReviewsThunk } from "../../store/reviews"
import OpenModalButton from "../OpenModalButton"
import DeleteReviewModal from "../DeleteReviewModal"
import EditReviewModal from "../EditReviewModal"
import EditUserReviews from "../EditReviewModal/EditReviewForUser"


export default function UserReviews() {

    const dispatch = useDispatch()
    const userReviews = useSelector(state => state?.reviews?.UserReviews)
    console.log("these are the user reviews", userReviews)

    const reviewList = []




//TESTING

    const testReviews = Object.values(userReviews)
    const orderReviews = testReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))


    orderReviews.forEach(review => {
        console.log("this is each review", review)
        reviewList.push(
            <div className="each-review">
                <h2>{review.Spot.name}</h2>
                <h3>{review.createdAt.slice(0, 7)}</h3>
                <h3>{review.review}</h3>
                <div>{<OpenModalButton buttonText="Delete" modalComponent={<DeleteReviewModal reviewId={review.id} />} />}{<OpenModalButton buttonText="Update" modalComponent={<EditUserReviews reviewId={review.id} editSpotId="reviews" userReviewSpotName={review.Spot.name} />} />}</div>
            </div>
        )

    })

//TESTING






    // THIS WORKS
    // Object.values(userReviews).forEach(review => {
    //     console.log("this is each review", review)
    //     reviewList.push(
    //         <div className="each-review">
    //             <h2>{review.Spot.name}</h2>
    //             <h3>{review.createdAt.slice(0, 7)}</h3>
    //             <h3>{review.review}</h3>
    //             <div>{<OpenModalButton buttonText="Delete" modalComponent={<DeleteReviewModal reviewId={review.id} />} />}{<OpenModalButton buttonText="Update" modalComponent={<EditUserReviews reviewId={review.id} editSpotId="reviews" userReviewSpotName={review.Spot.name} />} />}</div>
    //         </div>
    //     )

    // })
    // THIS WORKS



    useEffect(() => {
        dispatch(userReviewsThunk())
    }, [dispatch])

    return (
        <div className="user-reviews-container">
            <h1>Manage Reviews</h1>
            <div className="review-section">
                {reviewList.length ? reviewList : <h1>No Reviews</h1>}
            </div>
        </div>
    )
}
