import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal"
import ReviewForm from '../AddReviewModal/ReviewForm';



export default function EditReviewModal ({editSpotId}) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const review = useSelector(state => state.reviews.Reviews)
    const user = useSelector(state => state.session)
    const reviewValuesOnly = Object.values(review)
    console.log("these are all the reviews++++++", reviewValuesOnly)

    const userId = user.user.id
    console.log("this is the userId", userId)
    const targetReview = review[userId]
    console.log("this is the targetreview", targetReview)

    const spot = useSelector(state => state)
    console.log("this is the current spot", spot)
    console.log("this is the editspotid being passed down", editSpotId)

    let realTargetReview;

    for (let review of reviewValuesOnly) {
        if (review.userId === userId) realTargetReview = review
    }

    console.log("THIS IS THE REVIEW WE WANT", realTargetReview)

    // console.log("THIS IS THE REVIEW WE WANT", targetReview)
    // useEffect(() => {
    //     dispatch(singleSpotThunk(spotId))
    //    }, [dispatch, spotId]);

    return (
        <ReviewForm currentReview={realTargetReview} closeModal={closeModal} reviewType="edit" editSpotId={editSpotId} />
    )
}
