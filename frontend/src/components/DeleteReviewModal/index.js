import React from "react"
import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { deleteReviewThunk } from "../../store/reviews"

export default function DeleteReviewModal ({reviewId}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleDelete = (e) => {
        e.preventDefault()
        console.log(reviewId)
        return dispatch(deleteReviewThunk(reviewId)).then(closeModal)
    }

    return (
        <div>
            <h2>Confirm Delete</h2>
            <h3>Are you sure you want to delete this review?</h3>
            <div>
                <button onClick={handleDelete}>Yes (Delete Review)</button>
                <button onClick={closeModal}>No (Keep Review)</button>
            </div>
        </div>
    )
}
