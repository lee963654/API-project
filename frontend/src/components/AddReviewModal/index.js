import React from "react"
import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import ReviewForm from "./ReviewForm"

export default function AddReportModal ({spotId}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()

    const review = {
        description: "",
        stars: 0,
    }

    return (
        <ReviewForm review={review} reviewType="new" closeModal={closeModal} spotId={spotId}/>

    )
}
