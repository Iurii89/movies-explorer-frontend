import Main from '../Landing/Main/Main';
import Movies from '../Movies_Components/Movies/Movies';
import Profile from '../Register_Login_Profile/Profile/Profile';
import './App.css';
import { React, useEffect, useState, } from "react";
import Register from '../Register_Login_Profile/Register/Register';
import PageNotFound from '../Other_Component/PageNotFound/PageNotFound';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import SavedMovies from '../Movies_Components/SavedMovies/SavedMovies';
import Login from '../Register_Login_Profile/Login/Login';
import { CurrentUserContext } from "../Other_Component/contexts/CurrentUserContext";
import ProtectedRoute from '../Other_Component/ProtectedRoute/ProtectedRoute';
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';


function App() {
  const history = useHistory();

  const [isPopup, setIsPopup] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [isHiddenMenuOpen, setIsHiddenMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('token'));
  const [likeFilms, setLikeFilms] = useState([]);
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState("");
  const [seacrhShortFilms, setSeacrhShortFilms] = useState(false);
  const [allSearch, setAllSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorServer, setIsErrorServer] = useState("");



  useEffect(() => {
    const token = localStorage.getItem('token');

    if(token) {
      setLoggedIn(true)

      mainApi.getMovise()
        .then(savedMovies => setLikeFilms(savedMovies))
        .catch((err) => {
          setSearchError(err)
          onIsPopup()
          console.log(err)
        })

      mainApi.getUserData()
        .then((res) => {
          if (!res.ok) {
            return Promise.reject(`Error: ${res.status}`);
          }
          return res.json()})
        .then((user) => {
            setCurrentUser(user)
            moviesApi.getAllFilms()
              .then((res) => {
                if (!res.ok) {
                    return Promise.reject(`Error: ${res.status}`);
                }
                return res.json();
              })
                .then((array) => {
                  localStorage.setItem('arrayMovies', JSON.stringify(array))
                })
        }).catch((err) => {
          setSearchError(err)
          onIsPopup()
          console.log(err)
        })
    }
  }, [loggedIn, history])

  function offLoggedIn() {
    setLoggedIn(false)
  }

  function searchHandler(e) {
    setSearch(e.target.value)
  }

  function changeSearchShortFilms() {
    setSeacrhShortFilms(!seacrhShortFilms)
  }

  function onIsHiddenMenuOpen() {
      setIsHiddenMenuOpen(!isHiddenMenuOpen);
  }

  function onIsPopup() {
    setIsPopup(!isPopup)
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Switch>
          
          <Route exact path="/">
            <Main 
              loggedIn ={loggedIn}
            />
          </Route>

          <Route path="/signup">
            {loggedIn ?
              <Redirect to="./" />
              :
              <Register 
                setLoggedIn ={setLoggedIn}  
                setCurrentUser = {setCurrentUser}
                currentUser = {currentUser}
            />}
          </Route>

          <Route path="/signin">
            {loggedIn ?
              <Redirect to="./" />
              :
              <Login 
                setLoggedIn = {setLoggedIn}
                setCurrentUser = {setCurrentUser}
            />}
          </Route>


          <ProtectedRoute 
            path="/movies"
            component={Movies}
            popup ={isPopup}
            openClosePopup = {onIsPopup}
            isHiddenMenuOpen={isHiddenMenuOpen}
            onIsHiddenMenuOpen={onIsHiddenMenuOpen}
            loggedIn={loggedIn}
            setLikeFilms ={setLikeFilms}
            likeFilms = {likeFilms}
            search = {search}
            searchHandler = {searchHandler}
            searchError = {searchError}
            setSearchError = {setSearchError}
            seacrhShortFilms = {seacrhShortFilms}
            changeSearchShortFilms = {changeSearchShortFilms}
            allSearch = {allSearch}
            setAllSearch = {setAllSearch}
            isLoading = {isLoading}
            setIsLoading = {setIsLoading}
            isErrorServer = {isErrorServer}
            setIsErrorServer = {setIsErrorServer}
          />

          <ProtectedRoute 
            path="/saved-movies"
            component={SavedMovies}
            popup ={isPopup}
            openClosePopup = {onIsPopup}
            isHiddenMenuOpen={isHiddenMenuOpen}
            onIsHiddenMenuOpen={onIsHiddenMenuOpen}
            loggedIn={loggedIn}
            search = {search}
            searchHandler ={searchHandler}
            searchError = {searchError}
            setSearchError = {setSearchError}
            seacrhShortFilms = {seacrhShortFilms}
            changeSearchShortFilms = {changeSearchShortFilms}
            allSearch = {allSearch}
            setAllSearch = {setAllSearch}
            isLoading = {isLoading}
            setIsLoading = {setIsLoading}
            isErrorServer = {isErrorServer}
            setIsErrorServer = {setIsErrorServer}
            likeFilms = {likeFilms}
            setLikeFilms = {setLikeFilms}
          />

          <ProtectedRoute 
            path="/profile"
            component={Profile}
            setCurrentUser = {setCurrentUser}
            isHiddenMenuOpen={isHiddenMenuOpen}
            onIsHiddenMenuOpen={onIsHiddenMenuOpen}
            loggedIn={loggedIn}
            offLoggedIn = {offLoggedIn}
            popup = {isPopup}
            openClosePopup ={onIsPopup}
            text = "Данные успешно обновлены"
            yesOrNot = {true}
          />

          <Route>
            <PageNotFound />
          </Route>
          
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
