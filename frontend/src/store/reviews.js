import { csrfFetch } from "./csrf";

const SPOT_REVIEWS = "reviews/getReviews"




const spotReviews = (spotReviews) => {
    return {
        type: SPOT_REVIEWS,
        spotReviews,
    }
}





export const singleSpotReviewThunk = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)
    if (response.ok) {
        const spotReview = await response.json()
        console.log("response=======", response)
        dispatch(spotReviews(spotReview))
    }
}



const initialState = { Reviews: {}, ReviewImages: {} }

export default function reviewReducer (state = initialState, action) {
    switch(action.type) {
        case SPOT_REVIEWS: {
            const newState = {...state, Reviews: {}, ReviewImages: {...state.ReviewImages}}
            action.spotReviews.Reviews.forEach(review => {
                newState.Reviews[review.id] = review
            })

            return newState
        }
        default: {
            return state
        }
    }

}
