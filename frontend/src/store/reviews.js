import { csrfFetch } from "./csrf";

const SPOT_REVIEWS = "reviews/getReviews"
const ADD_REVIEW = "reviews/addReview"
const DELETE_REVIEW = "reviews/deleteReview"
const UPDATE_REVIEW = "reviews/updateReview"



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

const deleteReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

const updateReview = (review) => {
    return {
        type: UPDATE_REVIEW,
        review
    }
}



export const singleSpotReviewThunk = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)
    if (response.ok) {
        const spotReview = await response.json()
        console.log("this is the spot review in the spot review thunk", spotReview)
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

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
    })
    dispatch(deleteReview(reviewId))
}

export const updateReviewThunk = (review) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
    })
    if (response.ok) {
        const updatedReview = await response.json()
        dispatch(updateReview(updatedReview))
    }
}



const initialState = { Reviews: {}, ReviewImages: {}}

export default function reviewReducer (state = initialState, action) {
    switch(action.type) {
        case SPOT_REVIEWS: {
            const newState = {...state, Reviews: {}, ReviewImages: {...state.ReviewImages}}
            console.log("this is the review newstate=====", newState)
            console.log("this is the review action", action.spotReviews)
            action.spotReviews.Reviews.forEach(review => {
                newState.Reviews[review.id] = review
            })

            return newState
            // const newState = {...state, Reviews: {...state.Reviews}, ReviewImages: {...state.ReviewImages}}
            // console.log("this is the reviews action", action.spotReview)
        }
        case ADD_REVIEW: {
            const newState = {...state, Reviews: {...state.Reviews}, ReviewImages: {...state.ReviewImages}}
            newState.Reviews[action.spotReview.id] = action.spotReview
            console.log("this is the newState in the add review thunk", newState)
            return newState
            // THIS MAY BE WRONG
        }
        case DELETE_REVIEW: {
            const newState = {...state, Reviews: {...state.Reviews}, ReviewImages: {...state.ReviewImages}}
            delete newState.Reviews[action.reviewId]
            return newState
        }
        case UPDATE_REVIEW: {
            const newState = {...state, Reviews: {...state.Reviews}, ReviewImages: {...state.ReviewImages}}
            newState.Reviews[action.review.id] = action.review
            return newState
        }
        default: {
            return state
        }
    }

}
