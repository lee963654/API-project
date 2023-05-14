import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import * as spotsActions from "../../store/spots"
import "./Spots.css"

export default function SpotsIndex() {
    const dispatch = useDispatch();

    const spots = useSelector(state => state.spots.allSpots)
    console.log(spots)

    useEffect(() => {
        dispatch(spotsActions.allSpotsThunk())

    }, [dispatch]);


    const result = []

    // TEST
    const testSpots = Object.values(spots)
    // console.log("THESE ARE THE SPOTS WE NEED TO ORDER", testSpots)

    const sortedSpots = testSpots.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    // console.log("THESE ARE THE SORTED SPOTS", sortedSpots)


    sortedSpots.forEach(spot => {
        result.push(
            <div className="allspots-container">
                <Link className="allspots-link" key={spot.id} to={`/${spot.id}`} title={spot.name}>
                    <div key={spot.id} className="spots">
                        <img className="spot-image" src={spot.previewImage} style={{ width: 275, height: 275 }} alt="spot-images" />
                        <div className="spot-info">
                            <div>
                                <p className="info">{spot.city}, {spot.state}</p>
                            </div>
                            <div className="allspots-rating-container">
                                {/* <p className="info">{spot.avgRating}</p> */}
                                {spot.avgRating === "No Rating Available" ? <p className="info">No Rating</p> : <p className="info"><i class="fa-sharp fa-solid fa-star"></i> {spot.avgRating.toFixed(2)}</p>}
                            </div>
                        </div>
                        <div className="info"><span className="spot-price">${spot.price}</span> night</div>
                    </div>
                </Link>
            </div>
        )
    })
//TEST


    return (

        <div className="spot-info-container">
            <div className="inside-spot-info">
            {result && result}
            </div>
        </div>

    )
}
