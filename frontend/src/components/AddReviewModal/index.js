import React from "react"
import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import ReviewForm from "./ReviewForm"

export default function AddReportModal ({spotId}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const spotReview = {
        review: "",
        stars: 0,
    }

    return (
        <ReviewForm currentReview={spotReview} reviewType="new" closeModal={closeModal} addReportSpotId={spotId}/>

    )
}
