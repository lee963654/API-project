import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import "./ReviewForm.css"



export default function ReviewForm({ review, spotId, closeModal }) {

    const [description, setDescription] = useState(review.description)
    const [stars, setStars] = useState(review.stars)
    const [disabled, setDisabled] = useState(false)

    const onChange = (num) => {
        setStars(parseInt(num));
      };


    useEffect(() => {
        setStars(review.stars);
    }, [review.stars]);

    const handleSubmit = async () => {
        console.log("submitted")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <h1>How was your stay?</h1>
            <textarea
                minLength="10"
                rows="4"
                cols="50"
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <div className="stars-container">
                <div
                    className={stars >= 1 ? "filled" : "empty"}
                    onMouseEnter={() => {setStars(1)} }
                    onMouseLeave={() => setStars(review.stars)}
                    onClick={() => onChange(1)}
                >
                    <i class="fa-solid fa-star"></i>
                </div>
                <div
                    className={stars >= 2 ? "filled" : "empty"}
                    onMouseEnter={() => setStars(2) }
                    onMouseLeave={() => setStars(review.stars) }
                    onClick={() => onChange(2) }
                >
                    <i class="fa-solid fa-star"></i>
                </div>
                <div
                    className={stars >= 3 ? "filled" : "empty"}
                    onMouseEnter={() => setStars(3) }
                    onMouseLeave={() => setStars(review.stars) }
                    onClick={() => onChange(3) }
                >
                    <i class="fa-solid fa-star"></i>
                </div>
                <div
                    className={stars >= 4 ? "filled" : "empty"}
                    onMouseEnter={() => setStars(4) }
                    onMouseLeave={() => setStars(review.stars) }
                    onClick={() => onChange(4) }
                >
                    <i class="fa-solid fa-star"></i>
                </div>
                <div
                    className={stars >= 5 ? "filled" : "empty"}
                    onMouseEnter={() => setStars(5) }
                    onMouseLeave={() => setStars(review.stars) }
                    onClick={() => onChange(5)}
                >
                    <i class="fa-solid fa-star"></i>
                </div>
                <div>Stars</div>
            </div>
            <button disabled={description.length < 10}>Submit Your Review</button>
            </form>
        </div>
    )
}
