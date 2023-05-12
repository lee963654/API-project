import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotsIndex from "./components/SpotsIndex";
import SingleSpot from "./components/SingleSpot";
import CreateSpot from "./components/CreateSpot";
import UserSpot from "./components/UserSpot";
import EditSpot from "./components/EditSpot";
import UserReviews from "./components/UserReviews";



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));



  }, [dispatch]);



  return (
    <div className="main-container">
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
      <Switch>
        <Route exact path="/">
          <SpotsIndex />
        </Route>
        <Route exact path="/new">
          <CreateSpot />
        </Route>
        <Route exact path="/current">
          <UserSpot />
        </Route>
        <Route exact path="/reviews">
          <UserReviews />
        </Route>
        <Route exact path="/edit/:spotId">
          <EditSpot />
        </Route>
        <Route exact path="/:spotId">
          <SingleSpot />
        </Route>


      </Switch>}

    </div>
  );
}

export default App;
