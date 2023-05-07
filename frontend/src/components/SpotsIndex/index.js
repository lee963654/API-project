import React, {useEffect} from "react"
import { useSelector, useDispatch } from "react-redux"
import * as spotsActions from "../../store/spots"
import "./Spots.css"

export default function SpotsIndex () {
    const dispatch = useDispatch();

    const spots = useSelector(state => state.spots.allSpots)

    useEffect(() => {
        dispatch(spotsActions.allSpotsThunk())

      }, [dispatch]);


    const result = []

    Object.values(spots).forEach(spot => {
            result.push(
            <div key={spot.id} className="spot-information">
            <img src={spot.previewImage} style={{width: 400, height: 400}} alt="spot-images" />
                <div>
                <p>{spot.city}</p>
                <p>{spot.state}</p>
                <p>{spot.avgRating}</p>
                </div>
                <div>{spot.price} night</div>
            </div>)
      })



    return (

        <div className="spot-info-container">
            {result && result}
        </div>

    )
}
