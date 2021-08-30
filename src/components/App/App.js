import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Profile from '../Profile/Profile';
import './App.css';
import { React, useEffect, useState, } from "react";
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import { Route, Switch/* , Redirect, useHistory */ } from 'react-router-dom';
import SavedMovies from '../SavedMovies/SavedMovies';
import Login from '../Login/Login';


function App() {
  const [isPopup, setIsPopup] = useState(false);

  function onIsPopup() {
    setIsPopup(!isPopup)
  }

  return (
    <div className="app">
      <Switch>
        
        <Route exact path="/">
          <Main />
        </Route>

        <Route path="/movies">
          <Movies 
            popup ={isPopup}
            openClosePopup = {onIsPopup}
          />
        </Route>

        <Route path="/saved-movies">
          <SavedMovies />
        </Route>

        <Route path="/profile">
          <Profile />
        </Route>

        <Route path="/signup">
          <Register />
        </Route>

        <Route path="/signin">
          <Login />
        </Route>

        <Route>
          <PageNotFound />
        </Route>
        
      </Switch>
    </div>
  );
}

export default App;
