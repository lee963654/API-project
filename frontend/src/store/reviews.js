import { csrfFetch } from "./csrf";

const SPOT_REVIEWS = "reviews/getReviews"
const ADD_REVIEW = "reviews/addReview"




const spotReviews = (spotReviews) => {
    return {
        type: SPOT_REVIEWS,
        spotReviews,
    }
}

const addReview = (spotReview) => {
    return {
        type: ADD_REVIEW,
        spotReview
    }
}





export const singleSpotReviewThunk = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)
    if (response.ok) {
        const spotReview = await response.json()

        dispatch(spotReviews(spotReview))
    } else {
        const errors = await response.json()

    }
}

export const addReviewThunk = (spotId, review) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
    })
    if (response.ok) {
        const newReview = await response.json()
        console.log("this is the new review in the thunk", newReview)
        dispatch(addReview(newReview))

    }
}



const initialState = { Reviews: {}, ReviewImages: {} }

export default function reviewReducer (state = initialState, action) {
    switch(action.type) {
        case SPOT_REVIEWS: {
            const newState = {...state, Reviews: {}, ReviewImages: {...state.ReviewImages}}
            console.log("this is the review newstate=====", newState)
            action.spotReviews.Reviews.forEach(review => {
                newState.Reviews[review.id] = review
            })

            return newState
        }
        case ADD_REVIEW: {
            const newState = {...state, Reviews: {...state.Reviews}, ReviewImages: {...state.ReviewImages}}
            newState.Reviews[action.spotReview.id] = action.spotReview
            return newState
            // THIS MAY BE WRONG
        }
        default: {
            return state
        }
    }

}
