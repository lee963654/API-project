import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addReviewThunk } from '../../store/reviews';
import "./ReviewForm.css"



export default function ReviewForm({ currentReview, spotId, closeModal, reviewType }) {

    const dispatch = useDispatch()
    const history = useHistory()

    const [review, setReview] = useState(currentReview.review)
    const [stars, setStars] = useState(currentReview.stars)
    const [activeStars, setActiveStars] = useState(stars)



    // useEffect(() => {
    //     setActiveStars(stars);
    //   }, [stars]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("in the handleSubmit")
        const newReview = { ...currentReview, review: review, stars: activeStars}
        const resultReview = await dispatch(addReviewThunk(spotId, newReview))

        console.log("this is the newReview", newReview)
        console.log("this is the result review after the addreviewthunk", resultReview)
        history.push(`/`)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            {reviewType === "new" && <h1>How was your stay?</h1>}
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
                    onMouseEnter={() => setActiveStars(1) }
                    // onMouseLeave={() => setActiveStars(currentReview.stars)}
                    onClick={() => setStars(1)}
                >
                    <i class="fa-solid fa-star"></i>

                </div>
                <div
                    className={activeStars >= 2 ? "filled" : "empty"}
                    onMouseEnter={() => setActiveStars(2) }
                    onMouseLeave={() => setActiveStars(currentReview.stars) }
                    onClick={() => setStars(2) }
                >
                    <i class="fa-solid fa-star"></i>

                </div>
                <div
                    className={activeStars >= 3 ? "filled" : "empty"}
                    onMouseEnter={() => setActiveStars(3) }
                    onMouseLeave={() => setActiveStars(currentReview.stars) }
                    onClick={() => setStars(3) }
                >
                    <i class="fa-solid fa-star"></i>

                </div>
                <div
                    className={activeStars >= 4 ? "filled" : "empty"}
                    onMouseEnter={() => setActiveStars(4) }
                    onMouseLeave={() => setActiveStars(currentReview.stars) }
                    onClick={() => setStars(4) }
                >
                    <i class="fa-solid fa-star"></i>

                </div>
                <div
                    className={activeStars >= 5 ? "filled" : "empty"}
                    onMouseEnter={() => setActiveStars(5) }
                    onMouseLeave={() => setActiveStars(currentReview.stars) }
                    onClick={() => setStars(5)}
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
