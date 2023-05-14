import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { userReviewsThunk } from "../../store/reviews"
import OpenModalButton from "../OpenModalButton"
import DeleteReviewModal from "../DeleteReviewModal"
import EditReviewModal from "../EditReviewModal"
import EditUserReviews from "../EditReviewModal/EditReviewForUser"
import "./UserReviews.css"

export default function UserReviews() {

    const dispatch = useDispatch()
    const userReviews = useSelector(state => state?.reviews?.UserReviews)


    const reviewList = []

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



    //TESTING

    const testReviews = Object.values(userReviews)
    const orderReviews = testReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))


    orderReviews.forEach(review => {

        reviewList.push(
            <div className="each-review">
                <h3>{review.Spot.name}</h3>
                {/* <h3>{review.createdAt.slice(0, 7)}</h3> */}
                <h4>{monthObj[review.createdAt.slice(5, 7)]} {review.createdAt.slice(0, 4)}</h4>
                <h4>{review.review}</h4>
                <div className="user-reviews-buttons">{<OpenModalButton buttonText="Delete" modalComponent={<DeleteReviewModal reviewId={review.id} />} />}{<OpenModalButton buttonText="Update" modalComponent={<EditUserReviews reviewId={review.id} editSpotId="reviews" userReviewSpotName={review.Spot.name} />} />}</div>
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
            <div style={{width: 1000}}>
                <h1>Manage Reviews</h1>
            </div>
            <div className="review-section">
                {reviewList.length ? reviewList : <h1>No Reviews</h1>}
            </div>
        </div>
    )
}
