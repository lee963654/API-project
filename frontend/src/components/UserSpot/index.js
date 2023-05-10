import React, {useEffect} from "react"
import { useSelector, useDispatch } from "react-redux"
import { userSpotsThunk } from "../../store/spots"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import "./UserSpot.css"
import OpenModalButton from "../OpenModalButton"
import DeleteSpotModal from "../DeleteSpotModal"

export default function UserSpot () {
    const dispatch = useDispatch()

    const userSpots = useSelector(state => state.spots.singleSpot.Owner)
    const userSpotsValues = Object.values(userSpots)





    useEffect(() => {
        dispatch(userSpotsThunk());


      }, [dispatch]);

    const userSpotArr = []
    userSpotsValues.forEach(spot => {
        userSpotArr.push(

            <div key={spot.id} className="spots">
            <Link key={spot.id} to={`/${spot.id}`}>
            <img src={spot.previewImage} style={{width: 350, height: 350}} alt="spot-images" />
                <div className="spot-info">
                <p>{spot.city}</p>
                <p>{spot.state}</p>
                <p>{spot.avgRating}</p>
                </div>
                <div>{spot.price} night</div>
            </Link>
                <div>
                    <Link to={`/edit/${spot.id}`}><button>Update</button></Link>
                    <OpenModalButton buttonText="Delete" modalComponent={<DeleteSpotModal spotId={spot.id}/>} />
                </div>
            </div>


        )
    })




    return (
        <div className="user-spot-container">
            {userSpotArr && userSpotArr}
        </div>
    )

}
