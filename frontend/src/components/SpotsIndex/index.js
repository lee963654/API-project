import React, {useEffect} from "react"
import { useSelector, useDispatch } from "react-redux"
import * as spotsActions from "../../store/spots"
import "./Spots.css"

export default function SpotsIndex () {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spots.spots.allSpots)
    console.log("spots is going through", spots)

    useEffect(() => {
        dispatch(spotsActions.allSpotsThunk())

      }, [dispatch]);

    return (

        <div>
            {Object.values(spots) && Object.values(spots).map(spot => {
            return (
            <div key={spot.id}>
            <img src={spot.previewImage} style={{width: 400, height: 400}} alt="spot-images" />
                <div>
                <p>{spot.city}</p>
                <p>{spot.state}</p>
                <p>{spot.avgRating}</p>
                </div>
                <div>{spot.price} night</div>
            </div>
        )
      })}
      </div>
    )
}
