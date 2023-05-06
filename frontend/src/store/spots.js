

const ALL_SPOTS = "spots/allSpots";


// ACTIONS
const allSpots = (spots) => {
    return {
        type: ALL_SPOTS,
        spots,
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


// REDUCER

const initialState = { spots: { allSpots: {}, singleSpot: {} } }

export default function spotsReducer (state = initialState, action) {
    switch(action.type) {
        case ALL_SPOTS: {
            const newState = {...state}
            action.spots.Spots.forEach(spot => {
                newState.spots.allSpots[spot.id] = spot
            })

            return newState
        }
        default: {
            return state
        }
    }
}
