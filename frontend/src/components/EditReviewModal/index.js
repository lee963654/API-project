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


    const userId = user.user.id

    const targetReview = review[userId]


    const spot = useSelector(state => state)


    let realTargetReview;

    for (let review of reviewValuesOnly) {
        if (review.userId === userId) realTargetReview = review
    }



    // useEffect(() => {

    // })

    // console.log("THIS IS THE REVIEW WE WANT", targetReview)
    // useEffect(() => {
    //     dispatch(singleSpotThunk(spotId))
    //    }, [dispatch, spotId]);

    return (
        <ReviewForm currentReview={realTargetReview} closeModal={closeModal} reviewType="edit" editSpotId={editSpotId} />
    )
}
