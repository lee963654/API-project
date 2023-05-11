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

    Object.values(spots).forEach(spot => {
        result.push(
            <div className="allspots-container">
                <Link key={spot.id} to={`/${spot.id}`}>
                    <div key={spot.id} className="spots">
                        <img src={spot.previewImage} style={{ width: 350, height: 350 }} alt="spot-images" />
                        <div className="spot-info">
                            <p>{spot.city}</p>
                            <p>{spot.state}</p>
                            <p>{spot.avgRating}</p>
                        </div>
                        <div>{spot.price} night</div>
                    </div>
                </Link>
            </div>
        )
    })



    return (

        <div className="spot-info-container">
            {result && result}
        </div>

    )
}
