import { csrfFetch } from "./csrf";

const ALL_SPOTS = "spots/allSpots";
const SINGLE_SPOT = "spots/singleSpot"
const SPOTS_REVIEW = "spots/spotsReview"
const CREATE_SPOT = "spots/createSpot"
const USER_SPOT = "spots/userSpot"
const DELETE_SPOT = "spots/deleteSpot"


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

const createSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot,
    }
}

const getUserSpots = (userSpots) => {
    return {
        type: USER_SPOT,
        userSpots,
    }
}

const deleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId,
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


export const singleSpotReviewThunk = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)
    if (response.ok) {
        const spotReview = await response.json()

        dispatch(spotsReview(spotReview))
    }
}

export const createSpotThunk = (report, urlData) => async (dispatch) => {
    const response = await csrfFetch("/api/spots", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report),
    })
    if (response.ok) {
        const newSpot = await response.json()


        dispatch(createSpot(newSpot))


    }
}

export const userSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch("/api/spots/current")
    if (response.ok) {
        const userSpot = await response.json()
        console.log("the user in the thunk======", userSpot)
        dispatch(getUserSpots(userSpot))
    }
}

// export const deleteSpotThunk = () => async (dispatch) => {

// }


// REDUCER

// const initialState = { spots: { allSpots: {}, singleSpot: {} } }
// const initialState = { allSpots: {}, singleSpot: {}}

const initialState = { allSpots: {}, singleSpot: { review: {}, spotImages: {}, Owner: {}}}

export default function spotsReducer (state = initialState, action) {
    switch(action.type) {
        case ALL_SPOTS: {

            // const newState = { allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot}}
            // action.spots.Spots.forEach(spot => {
            //     newState.allSpots[spot.id] = spot
            // })
            // return newState

            const newState = { allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot, review: {...state.singleSpot.review}, spotImages: {...state.singleSpot.spotImages}, Owner: {...state.singleSpot.Owner}}}
            action.spots.Spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            })

            return newState


        }
        case SINGLE_SPOT: {
            // const newState = { allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot}}
            // newState.singleSpot[action.spot.id] = action.spot

            // return newState

            const newState = { allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot, review: {...state.singleSpot.review}, spotImages: {...state.singleSpot.spotImages}, Owner: {...state.singleSpot.Owner}}}
            newState.singleSpot[action.spot.id] = action.spot

            return newState
        }
        case SPOTS_REVIEW: {
            const newState = { allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot, review: {...state.singleSpot.review}, spotImages: {...state.singleSpot.spotImages}, Owner: {...state.singleSpot.Owner}}}
            // console.log("action=====", action)
            action.spot.Reviews.forEach(review => {
                // console.log("review========", review)

                newState.singleSpot.review[review.id] = review
            })
            // console.log("newState======", newState)
            return newState
        }
        case CREATE_SPOT: {
            const newState = { allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot, review: {...state.singleSpot.review}, spotImages: {...state.singleSpot.spotImages}, Owner: {...state.singleSpot.Owner}}}
            newState.allSpots[action.spot.id] = action.spot
            return newState
        }
        case USER_SPOT: {
            const newState = { allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot, review: {...state.singleSpot.review}, spotImages: {...state.singleSpot.spotImages}, Owner: {}}}
            console.log("this is the action", action)

            action.userSpots.Spots.forEach(spot => {
                // newState.singleSpot.Owner[spot.ownerId] = {...newState.singleSpot.Owner[spot.ownerId]}
                newState.singleSpot.Owner[spot.id] = spot

            })

            return newState
        }
        default: {
            return state
        }
    }
}
