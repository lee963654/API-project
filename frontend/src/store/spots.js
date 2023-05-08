

const ALL_SPOTS = "spots/allSpots";
const SINGLE_SPOT = "spots/singleSpot"
const SPOTS_REVIEW = "spots/spotsReview"



// ACTIONS
const allSpots = (spots) => {
    return {
        type: ALL_SPOTS,
        spots,
    }
}

const singleSpot = (spot) => {
    return {
        type: SINGLE_SPOT,
        spot,
    }
}

const spotsReview = (spot) => {
    return {
        type: SPOTS_REVIEW,
        spot,
    }
}




// THUNK
export const allSpotsThunk = () => async (dispatch) => {
    const response = await fetch("/api/spots")
    if (response.ok) {
        const spots = await response.json()
        // console.log("spots=========", spots)
        dispatch(allSpots(spots))
    }
}

export const singleSpotThunk = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`)
    if (response.ok) {
        const spot = await response.json()

        dispatch(singleSpot(spot))
    }
}

// THIS MAY NOT WORK REMEMBER TO FIX
export const singleSpotReviewThunk = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)
    if (response.ok) {
        const spotReview = await response.json()

        dispatch(spotsReview(spotReview))
    }
}
//===========================================




// REDUCER

// const initialState = { spots: { allSpots: {}, singleSpot: {} } }
// const initialState = { allSpots: {}, singleSpot: {}}

const initialState = { allSpots: {}, singleSpot: { review: {}}}

export default function spotsReducer (state = initialState, action) {
    switch(action.type) {
        case ALL_SPOTS: {

            // const newState = { allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot}}
            // action.spots.Spots.forEach(spot => {
            //     newState.allSpots[spot.id] = spot
            // })
            // return newState

            const newState = { allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot, review: {...state.singleSpot.review}}}
            action.spots.Spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            })

            return newState


        }
        case SINGLE_SPOT: {
            // const newState = { allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot}}
            // newState.singleSpot[action.spot.id] = action.spot

            // return newState

            const newState = { allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot, review: {...state.singleSpot.review}}}
            newState.singleSpot[action.spot.id] = action.spot

            return newState
        }
        case SPOTS_REVIEW: {
            const newState = { allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot, review: {...state.singleSpot.review}}}
            // console.log("action=====", action)
            action.spot.Reviews.forEach(review => {
                // console.log("review========", review)

                newState.singleSpot.review[review.id] = review
            })
            // console.log("newState======", newState)
            return newState
        }

        default: {
            return state
        }
    }
}
