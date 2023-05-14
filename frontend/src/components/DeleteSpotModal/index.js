import React from "react"
import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { deleteSpotThunk, singleSpotThunk } from "../../store/spots"
import { singleSpotReviewThunk } from "../../store/reviews"
import "./DeleteSpotModal.css"

export default function DeleteSpotModal ({spotId}) {

    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleDelete = (e) => {
        e.preventDefault()
        return dispatch(deleteSpotThunk(spotId)).then(async () => {await dispatch(singleSpotThunk(spotId))}).then(closeModal)
    }
    // .then(async () => {await dispatch(singleSpotReviewThunk(spotId))})
    return (
        <div className="delete-spot-container">
            <h2>Confirm Delete</h2>
            <div className="delete-spot-text">Are you sure you want to remove this spot from the listings?</div>
            <div className="delete-buttons">
                <button className="delete-yes" onClick={handleDelete}>Yes (Delete Spot)</button>
                <button className="delete-no" onClick={closeModal}>No (Keep Spot)</button>
            </div>
        </div>
    )
}
