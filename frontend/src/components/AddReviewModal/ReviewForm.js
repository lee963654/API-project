import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addReviewThunk, singleSpotReviewThunk, updateReviewThunk, userReviewsThunk } from '../../store/reviews';

import "./ReviewForm.css"
import { singleSpotThunk } from '../../store/spots';



export default function ReviewForm({ currentReview, addReportSpotId, closeModal, reviewType, editSpotId, userReviewSpotName }) {

    const dispatch = useDispatch()
    const history = useHistory()

    const [review, setReview] = useState(currentReview.review)
    const [stars, setStars] = useState(currentReview.stars)
    const [activeStars, setActiveStars] = useState(stars)

    const [validate, setValidate] = useState(false)
    const [errors, setErrors] = useState({});

    // useEffect(() => {
    //     setActiveStars(stars);
    //   }, [stars]);

    const err = {}

    const userHasReview = useSelector(state => state.reviews.Reviews)
    console.log("trying to check if user already has review", Object.values(userHasReview))
    const currentUser = useSelector(state => state.session.user ? state.session.user.id : null)
    console.log("trying to find the current user", currentUser)

    const spotName = useSelector(state => state.spots.allSpots ? state.spots.allSpots[editSpotId] : null)
    // console.log('THIS IS THE SPOTNAME', spotName.name)
    // console.log("THIS IS THE SPOTID", editSpotId)
    // console.log("THIS IS TEH SPOTNAME", spotName)
    // console.log("THIS IS THE USERREVIEWSPOTNAME", userReviewSpotName)

    // useEffect(() => {

    //     if (stars === 0) {
    //         err.stars = "Must pick a star rating"
    //     }
    //     for (let review of Object.values(userHasReview)) {
    //         if (review.userId === currentUser) {
    //             err.hasReview = "Review already exists for this spot"
    //         }
    //     }
    //     setErrors(err)

    // }, [stars, userHasReview, validate])

    console.log("THERES ARE THE ERRORS", errors)

    console.log("this is the edit spot id THAT WE WANT", editSpotId)
    const handleSubmit = async (e) => {
        e.preventDefault()

        setValidate(false)

        const newReview = { ...currentReview, review: review, stars: stars }

        //test
        // const test = {}
        // console.log("THESE ARE THE STARS", stars)
        // if (stars === 0) {
        //     err.stars = "Must pick a star rating"
        // }
        // setErrors(err)
        //test
        console.log("THESE ARE THE ERRORS IN THE HANDLE SUBMIT", errors)
        console.log("THIS IS THE VALIDATE", validate)

        if (Object.values(errors).length) {
            setValidate(true)
        }

        if (reviewType === "new" && validate === false) {
        return dispatch(addReviewThunk(addReportSpotId, newReview)).then(async () => {
            await dispatch(singleSpotReviewThunk(addReportSpotId))
        }).then(async () => {await dispatch(singleSpotThunk(addReportSpotId))}).then(() => history.push(`/${addReportSpotId}`)).then(closeModal)
        }
        if (reviewType === "edit" && validate === false) {
            return dispatch(updateReviewThunk(newReview)).then(async () => { await dispatch(singleSpotReviewThunk(editSpotId))}).then(async () => {await dispatch(userReviewsThunk())}).then(async () => {await dispatch(singleSpotThunk(editSpotId))}).then(() => history.push(`/${editSpotId}`)).then(closeModal)
        }

    }

    useEffect(() => {

        if (stars === 0) {
            err.stars = "Must pick a star rating"
        }
        // for (let review of Object.values(userHasReview)) {
        //     if (review.userId === currentUser) {
        //         err.hasReview = "Review already exists for this spot"
        //     }
        // }
        setErrors(err)

    }, [stars, userHasReview, validate])

    // useEffect(() => {

    // }, [stars])
    console.log("THESE ARE THE ERRORS", Object.values(errors))

    const newReviewClass = "review-form-container"
    const editReviewClass = "review-form-container-edit"
    const newReviewClassError = "review-form-container-errors"
    const editReviewClassError = "review-form-container-edit-errors"

    return (
        // <div className="review-form-container">
        // <div className={validate === true ? "review-form-container-errors" : "review-form-container"}>
        <div className={(validate && reviewType === "new") ? newReviewClassError : (validate && reviewType === "edit") ? editReviewClassError : ((validate === false) && reviewType === "new") ? newReviewClass : editReviewClass}>
            <form className="review-form" onSubmit={handleSubmit}>
                {reviewType === "new" && <h1>How was your stay?</h1>}
                {reviewType === "edit" && spotName && <h1>How was your stay at {spotName ? spotName.name : null}</h1>}
                {reviewType === "edit" && userReviewSpotName && <h1>How was your stay at {userReviewSpotName}</h1>}
                {errors.stars && validate && <p className="errors">{errors.stars}</p> }
                {errors.hasReview && validate && <p className="errors">{errors.hasReview}</p> }
                <textarea
                    className="review-textarea"
                    minLength="10"
                    rows="4"
                    cols="50"
                    type="text"
                    placeholder="Description"

                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />


                <div className="stars-container">
                    <div
                        className={activeStars >= 1 ? "filled" : "empty"}
                        onMouseEnter={() => setActiveStars(1)}
                        onMouseLeave={() => setActiveStars(stars)}
                        onClick={() => { setStars(1) }}
                    >
                        <i class="fa-solid fa-star"></i>

                    </div>
                    <div
                        className={activeStars >= 2 ? "filled" : "empty"}
                        onMouseEnter={() => setActiveStars(2)}
                        onMouseLeave={() => setActiveStars(stars)}
                        onClick={() => { setStars(2) }}
                    >
                        <i class="fa-solid fa-star"></i>

                    </div>
                    <div
                        className={activeStars >= 3 ? "filled" : "empty"}
                        onMouseEnter={() => setActiveStars(3)}
                        onMouseLeave={() => setActiveStars(stars)}
                        onClick={() => { setStars(3) }}
                    >
                        <i class="fa-solid fa-star"></i>

                    </div>
                    <div
                        className={activeStars >= 4 ? "filled" : "empty"}
                        onMouseEnter={() => setActiveStars(4)}
                        onMouseLeave={() => setActiveStars(stars)}
                        onClick={() => { setStars(4) }}
                    >
                        <i class="fa-solid fa-star"></i>

                    </div>
                    <div
                        className={activeStars >= 5 ? "filled" : "empty"}
                        onMouseEnter={() => setActiveStars(5)}
                        onMouseLeave={() => setActiveStars(stars)}
                        onClick={() => { setStars(5) }}
                    >
                        <i class="fa-solid fa-star"></i>

                    </div>
                    <div>Stars</div>
                </div>
                <button className={review.length < 10 || stars === 0 ? "review-button" : "review-button-enable"} disabled={review.length < 10 || stars === 0}>Submit Your Review</button>
            </form>
        </div>
    )
}
