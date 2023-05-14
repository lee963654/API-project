import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { userSpotsThunk } from "../../store/spots"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import "./UserSpot.css"
import OpenModalButton from "../OpenModalButton"
import DeleteSpotModal from "../DeleteSpotModal"

export default function UserSpot() {
    const dispatch = useDispatch()

    const userSpots = useSelector(state => state.spots.singleSpot.Owner)
    const userSpotsValues = Object.values(userSpots)


    useEffect(() => {
        dispatch(userSpotsThunk());


    }, [dispatch]);

    // TEST
    const sortedUserSpots = userSpotsValues.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    // TEST

    const userSpotArr = []

    sortedUserSpots.forEach(spot => {
        userSpotArr.push(

            // <div className="allspots-container">
            //     <Link className="allspots-link" key={spot.id} to={`/${spot.id}`} title={spot.name}>
            //         <div key={spot.id} className="spots">
            //             <img className="spot-image" src={spot.previewImage} style={{ width: 275, height: 275 }} alt="spot-images" />
            //             <div className="spot-info">
            //                 <div>
            //                     <p className="info">{spot.city}, {spot.state}</p>
            //                 </div>
            //                 <div className="allspots-rating-container">
            //                     {/* <p className="info">{spot.avgRating}</p> */}
            //                     {spot.avgRating === "No Rating Available" ? <p className="info">No Rating</p> : <p className="info"><i class="fa-sharp fa-solid fa-star"></i>{spot.avgRating}</p>}
            //                 </div>
            //             </div>
            //             <div className="info"><span className="spot-price">${spot.price}</span> night</div>
            //         </div>
            //     </Link>
            // </div>

            //TESTING
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

                <div className="user-buttons-bottom">
                    <Link to={`/edit/${spot.id}`}><button className="user-update-button">Update</button></Link>

                    <OpenModalButton buttonText="Delete" modalComponent={<DeleteSpotModal spotId={spot.id} />} />
                </div>
            </div>
            //TESTING
        )
    })




    return (
        <div className="spot-info-container">
            <div className="inside-spot-info">
                {userSpotArr && userSpotArr}
            </div>
        </div>
    )

}
