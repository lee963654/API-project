import React from "react"
import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { deleteSpotThunk, singleSpotThunk } from "../../store/spots"
import { singleSpotReviewThunk } from "../../store/reviews"

export default function DeleteSpotModal ({spotId}) {

    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleDelete = (e) => {
        e.preventDefault()
        return dispatch(deleteSpotThunk(spotId)).then(async () => {await dispatch(singleSpotThunk(spotId))}).then(closeModal)
    }
    // .then(async () => {await dispatch(singleSpotReviewThunk(spotId))})
    return (
        <div>
            <h2>Confirm Delete</h2>
            <h3>Are you sure you want to remove this spot from the listings?</h3>
            <div>
                <button onClick={handleDelete}>Yes (Delete Spot)</button>
                <button onClick={closeModal}>No (Keep Spot)</button>
            </div>
        </div>
    )
}
