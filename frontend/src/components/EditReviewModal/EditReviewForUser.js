import { useDispatch, useSelector } from 'react-redux';
import { useModal } from "../../context/Modal"
import ReviewForm from '../AddReviewModal/ReviewForm';

export default function EditUserReviews ({reviewId, editSpotId, userReviewSpotName}) {

    const {closeModal} = useModal()

    const userReview = useSelector(state => state.reviews.UserReviews ? state.reviews.UserReviews[reviewId] : null)
    // console.log("This is the reviewId WE WANT", reviewId)
    // console.log("This is the user review WE WANT", userReview)


    return (
        <ReviewForm currentReview={userReview} closeModal={closeModal} reviewType="edit" editSpotId={editSpotId} userReviewSpotName={userReviewSpotName} />
    )
}
