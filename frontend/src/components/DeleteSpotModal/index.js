import React from "react"
import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { deleteSpotThunk } from "../../store/spots"

export default function DeleteSpotModal ({spotId}) {

    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const handleDelete = (e) => {
        e.preventDefault()
        return dispatch(deleteSpotThunk(spotId)).then(closeModal)
    }

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
