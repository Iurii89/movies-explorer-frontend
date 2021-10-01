import Footer from "../../Footer_Header_MenuBurger/Footer/Footer";
import Header from "../../Footer_Header_MenuBurger/Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import {React, useState, useEffect, useContext} from 'react';
import HeaderMain from "../../Footer_Header_MenuBurger/Header/HeaderMain/HeaderMain";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardListButtonMore from "../MoviesCardList/MoviesCardListButtonMore/MoviesCardListButtonMore";
import mainApi from "../../../utils/MainApi";
import { CurrentUserContext } from "../../Other_Component/contexts/CurrentUserContext";


function Movies({
    popup, 
    openClosePopup, 
    isHiddenMenuOpen, 
    onIsHiddenMenuOpen, 
    setLikeFilms,
    likeFilms,
    search,
    searchHandler,
    searchError,
    setSearchError,
    seacrhShortFilms,
    changeSearchShortFilms,
    allSearch,
    setAllSearch,
    isLoading,
    setIsLoading,
    isErrorServer,
    setIsErrorServer,
    }) {
    const currentUser = useContext(CurrentUserContext);

    const [isMovies, setIsMovies] = useState([]);
    const [isbuttonAddclick1280, setIsbuttonAddclick1280] = useState(12)
    const [isbuttonAddclick768, setIsbuttonAddclick768] = useState(8)
    const [isbuttonAddclick480, setIsbuttonAddclick480] = useState(5)


    const localStorageSearch = JSON.parse(localStorage.getItem('search'))
    console.log(localStorageSearch)

    const localStorageFilms = JSON.parse(localStorage.getItem('arrayMovies'))
    console.log(localStorageFilms)
    const localStorageSortFilmsFitSearch = localStorageFilms && localStorageFilms.filter(film => film.nameRU.includes(localStorageSearch))
    const shortSearchFilms = isMovies.filter(film => film.duration <= 40)
    const shortLocalStoregeFilms = localStorageSortFilmsFitSearch && localStorageSortFilmsFitSearch.filter(film => film.duration <= 40)


    function useWindowWidth() {
        const [width, setWidth] = useState(window.innerWidth)
        useEffect(() => {
            const handleResize = () => {
                setWidth(window.innerWidth)
            }
            window.addEventListener("resize", handleResize)
            return () => {
                window.removeEventListener("resize", handleResize)
            }
        }, [])
        return width
    }
    const widthWindow = useWindowWidth();

    function defineWidth () {
        if (widthWindow > 768) {
            return isbuttonAddclick1280
        } else if (widthWindow <= 768 && widthWindow > 480) {
            return isbuttonAddclick768
        } else if (widthWindow <= 480) {
            return isbuttonAddclick480
        }
    }

    function sortArrayFitScreenWidth() {
        if(seacrhShortFilms) {
            return shortSearchFilms.slice(0, defineWidth())
        } else return isMovies.slice(0, defineWidth())
    }

    function sortLocalStoregeFitScreenWidth() {
        if(seacrhShortFilms) {
            return shortLocalStoregeFilms.slice(0, defineWidth())
        } else return localStorageSortFilmsFitSearch.slice(0, defineWidth())
    }

    function addCardsFilms() {
                    if((isMovies.length !== 0) && isLoading === false) {

                        return sortArrayFitScreenWidth().map((movie) => {
                            const likeOrNotLike = likeFilms.some((likeFilm) => {
                                if((likeFilm.owner === currentUser._id) && (movie.nameRU === likeFilm.nameRU)) {
                                    return true
                                } else return false
                            }) 

                            return <MoviesCard 
                                        film = {movie}
                                        likeIt = {likeOrNotLike}
                                        key = {movie.id}
                                        popup = {popup}
                                        openClosePopup = {openClosePopup}
                                        searchError = {searchError}
                                        setSearchError = {setSearchError}
                                    />})
            
                    } else if (localStorageSearch && (isMovies.length === 0)) {

                        return sortLocalStoregeFitScreenWidth().map((movie) => {
                            const likeOrNotLike = likeFilms.some((likeFilm) => {
                                if((likeFilm.owner === currentUser._id) && (movie.nameRU === likeFilm.nameRU)) {
                                    return true
                                } else return false
                            }) 

                            return <MoviesCard 
                                        film = {movie}
                                        likeIt = {likeOrNotLike}
                                        key = {movie.id}
                                        popup = {popup}
                                        openClosePopup = {openClosePopup}
                                        searchError = {searchError}
                                        setSearchError = {setSearchError}
                                    />})
                    }
    }

    function changeArraylengthIfButtonClick() {
        if (widthWindow > 768) {
            setIsbuttonAddclick1280(isbuttonAddclick1280 + 3)
        } else if (widthWindow <= 768 && widthWindow > 480) {
            setIsbuttonAddclick768(isbuttonAddclick768 + 2)
        } else if (widthWindow <= 480) {
            setIsbuttonAddclick480(isbuttonAddclick480 + 2)
        }
    }

    function showButtonMoreFilms() {
        if((seacrhShortFilms ? sortArrayFitScreenWidth().length < shortSearchFilms.length : sortArrayFitScreenWidth().length < isMovies.length) && search !== "") {
            return <MoviesCardListButtonMore downloadMoreFilms={changeArraylengthIfButtonClick}/>
        } else if (localStorageSearch && (seacrhShortFilms ? sortLocalStoregeFitScreenWidth().length < shortLocalStoregeFilms.length : sortLocalStoregeFitScreenWidth().length < localStorageSortFilmsFitSearch.length) && allSearch === "") {
            return <MoviesCardListButtonMore downloadMoreFilms={changeArraylengthIfButtonClick}/>
        }
    }


    function onDefaultArrayLength() {
        setIsbuttonAddclick1280(12)
        setIsbuttonAddclick768(8)
        setIsbuttonAddclick480(5)
    }


    function searchSubmit(e) {
        e.preventDefault();

        setIsLoading(true)
        const filmsArray = JSON.parse(localStorage.getItem('arrayMovies'))
        mainApi.getMovise()
            .then(savedMovies => setLikeFilms(savedMovies))
            .catch((err) => {
                setSearchError(err)
                openClosePopup()
                console.log(err)
            })

        if (search === "") 
            {
                setSearchError("Нужно ввести ключевое слово")
                openClosePopup()
                setIsLoading(false)
            }
        else    
                localStorage.setItem('search', JSON.stringify(search))
                setIsMovies(filmsArray.filter(film => film.nameRU.includes(search)))
                setIsErrorServer("")
                onDefaultArrayLength()
                setAllSearch(search)
                setIsLoading(false)
    }


    return (
        <section className="movies">
            <Header 
                navBar={
                    <HeaderMain 
                        isHiddenMenuOpen={isHiddenMenuOpen}
                        onIsHiddenMenuOpen={onIsHiddenMenuOpen}
                        page = "movies"
                    />}
                headerClassName={true}
            />
            <SearchForm 
                popup = {popup}
                openClosePopup = {openClosePopup}
                search = {search}
                searchHandler = {searchHandler}
                searchError = {searchError}
                searchSubmit = {searchSubmit}
                changeSearchShortFilms = {changeSearchShortFilms}
                seacrhShortFilms = {seacrhShortFilms}
            />
            <MoviesCardList 
                allSearch = {allSearch}
                isLoading = {isLoading}
                isErrorServer = {isErrorServer}
                sortArrayFitScreenWidth = {sortArrayFitScreenWidth}
                addCardsFilms = {addCardsFilms}
                showButtonMoreFilms = {showButtonMoreFilms}
                movies = {true}
            />
            <Footer />
        </section>
    )
}

export default Movies;