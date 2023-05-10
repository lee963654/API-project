import { csrfFetch } from "./csrf";

const ALL_SPOTS = "spots/allSpots";
const SINGLE_SPOT = "spots/singleSpot"
// const SPOTS_REVIEW = "spots/spotsReview"
const CREATE_SPOT = "spots/createSpot"
const USER_SPOT = "spots/userSpot"
const DELETE_SPOT = "spots/deleteSpot"
const UPDATE_SPOT = "spots/updateSpot"


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

const updateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
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
        console.log("this is the spot in the single spot thunk", spot)
        dispatch(singleSpot(spot))
    }
}

export const updateSpotThunk = (spot) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spot),
    })
    if (response.ok) {
        const newUpdatedSpot = await response.json()
        console.log("this is the new updated spot in the thunk====", newUpdatedSpot)
        dispatch(updateSpot(newUpdatedSpot))
    }
}

export const createSpotThunk = (report) => async (dispatch) => {
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

        dispatch(getUserSpots(userSpot))
    }
}

// export const deleteSpotThunk = () => async (dispatch) => {

// }


// REDUCER

// const initialState = { spots: { allSpots: {}, singleSpot: {} } }
// const initialState = { allSpots: {}, singleSpot: {}}

const initialState = { allSpots: {}, singleSpot: { spotImages: {}, Owner: {}}}

export default function spotsReducer (state = initialState, action) {
    switch(action.type) {
        case ALL_SPOTS: {

            // const newState = { allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot}}
            // action.spots.Spots.forEach(spot => {
            //     newState.allSpots[spot.id] = spot
            // })
            // return newState

            const newState = { allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot, spotImages: {...state.singleSpot.spotImages}, Owner: {...state.singleSpot.Owner}}}
            action.spots.Spots.forEach(spot => {
                newState.allSpots[spot.id] = spot
            })

            return newState


        }
        case SINGLE_SPOT: {
            // const newState = { allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot}}
            // newState.singleSpot[action.spot.id] = action.spot

            // return newState

            const newState = { allSpots: {...state.allSpots}, singleSpot: { spotImages: {...state.singleSpot.spotImages}, Owner: {...state.singleSpot.Owner}}}
            newState.singleSpot[action.spot.id] = action.spot

            return newState
        }

        case CREATE_SPOT: {
            const newState = { allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot, spotImages: {...state.singleSpot.spotImages}, Owner: {...state.singleSpot.Owner}}}
            newState.allSpots[action.spot.id] = action.spot
            return newState
        }
        case USER_SPOT: {
            const newState = { allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot, spotImages: {...state.singleSpot.spotImages}, Owner: {}}}


            action.userSpots.Spots.forEach(spot => {
                // newState.singleSpot.Owner[spot.ownerId] = {...newState.singleSpot.Owner[spot.ownerId]}
                newState.singleSpot.Owner[spot.id] = spot

            })

            return newState
        }
        case UPDATE_SPOT: {
            // const newState = { allSpots: {...state.allSpots}, singleSpot: {...state.singleSpot, spotImages: {...state.singleSpot.spotImages}, Owner: {...state.singleSpot.Owner}}}
            const newState = {...state}
            console.log("this is the state in the store", state)
            console.log("this is the newstate in the store", newState)
            console.log("this is the action in the reducer", action)
            newState.allSpots[action.spot.id] = action.spot
            newState.singleSpot[action.spot.id] = action.spot
            return newState
        }
        default: {
            return state
        }
    }
}
