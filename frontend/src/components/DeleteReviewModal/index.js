import React from "react"
import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { deleteReviewThunk, userReviewsThunk, singleSpotReviewThunk } from "../../store/reviews"
import { singleSpotThunk } from "../../store/spots"


export default function DeleteReviewModal ({reviewId, spotId}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleDelete = (e) => {
        e.preventDefault()

        return dispatch(deleteReviewThunk(reviewId)).then(async () => {await dispatch(userReviewsThunk())}).then(async () => {await dispatch(singleSpotThunk(spotId))}).then(async () => {await dispatch(singleSpotReviewThunk(spotId))}).then(closeModal)
    }

    return (
        // THIS WORKS
        // <div className="delete-spot-container">
        //     <h2>Confirm Delete</h2>
        //     <h3>Are you sure you want to delete this review?</h3>
        //     <div>
        //         <button onClick={handleDelete}>Yes (Delete Review)</button>
        //         <button onClick={closeModal}>No (Keep Review)</button>
        //     </div>
        // </div>
        // THIS WORKS

        <div className="delete-spot-container">
            <h2>Confirm Delete</h2>
            <div className="delete-spot-text">Are you sure you want to delete this review?</div>
            <div className="delete-buttons">
                <button className="delete-yes" onClick={handleDelete}>Yes (Delete Review)</button>
                <button className="delete-no" onClick={closeModal}>No (Keep Review)</button>
            </div>
        </div>
    )
}
