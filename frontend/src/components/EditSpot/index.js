import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateSpotForm from "../CreateSpot/CreateSpotForm";
import { singleSpotThunk } from '../../store/spots';



export default function EditSpot () {
    const { spotId } = useParams();
    const dispatch = useDispatch()
    const editSpot = useSelector((state) => state.spots.singleSpot[spotId]);
    console.log("this is the edit report========", editSpot)

    useEffect(() => {
       dispatch(singleSpotThunk(spotId))
      }, [dispatch, spotId]);

      if (!editSpot) return null

    return (
        Object.keys(editSpot).length > 1 && (
            <>
              <CreateSpotForm
                report={editSpot}
                formType="Update Your Spot"
              />
            </>
          )
    )
}
