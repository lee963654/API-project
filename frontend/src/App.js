import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";


import * as spotsActions from "./store/spots"

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));

    dispatch(spotsActions.allSpotsThunk())

  }, [dispatch]);

  const spots = useSelector((state) => state.spots.spots.allSpots)

  // console.log("all the spots ==========", Object.values(spots))

  // GET THE IMAGES TO WORK

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch></Switch>}
      {Object.values(spots).map(spot => {
        return (
        <div>
          <div></div>
        </div>
        )
      })}
    </>
  );
}

export default App;
