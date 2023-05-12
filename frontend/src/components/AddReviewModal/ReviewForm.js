import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addReviewThunk, singleSpotReviewThunk, updateReviewThunk } from '../../store/reviews';

import "./ReviewForm.css"



export default function ReviewForm({ currentReview, addReportSpotId, closeModal, reviewType, editSpotId }) {

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

    useEffect(() => {

    })

    console.log("this is the edit spot id THAT WE WANT", editSpotId)
    const handleSubmit = async (e) => {
        e.preventDefault()

        setErrors({}) // testing

        const newReview = { ...currentReview, review: review, stars: stars }

        // THIS WORKS
        if (reviewType === "new") {
        return dispatch(addReviewThunk(addReportSpotId, newReview)).then(async () => {
            await dispatch(singleSpotReviewThunk(addReportSpotId))
        }).then(history.push(`/${addReportSpotId}`)).then(closeModal)
        }
        if (reviewType === "edit") {
            return dispatch(updateReviewThunk(newReview)).then(async () => { await dispatch(singleSpotReviewThunk(editSpotId))}).then(history.push(`/${editSpotId}`)).then(closeModal)
        }

    }
    useEffect(() => {
        console.log("tracking stars", stars)
    }, [stars])


    return (
        <div>
            <form onSubmit={handleSubmit}>
                {errors && <p>{errors.stars}</p>}
                {reviewType === "new" && <h1>How was your stay?</h1>}
                {reviewType === "edit" && <h1>How was your stay at change this later?</h1>}
                <textarea
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
                <button disabled={review.length < 10}>Submit Your Review</button>
            </form>
        </div>
    )
}
