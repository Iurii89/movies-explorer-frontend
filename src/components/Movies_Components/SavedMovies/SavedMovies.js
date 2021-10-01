import React, { useContext } from "react";
import Footer from "../../Footer_Header_MenuBurger/Footer/Footer";
import Header from "../../Footer_Header_MenuBurger/Header/Header";
import HeaderMain from "../../Footer_Header_MenuBurger/Header/HeaderMain/HeaderMain";
import MoviesCard from "../MoviesCard/MoviesCard";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import { CurrentUserContext } from "../../Other_Component/contexts/CurrentUserContext";
import mainApi from "../../../utils/MainApi";


function SavedMovies({
    popup, 
    openClosePopup, 
    isHiddenMenuOpen, 
    onIsHiddenMenuOpen,
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
    likeFilms,
    setLikeFilms,
    }) 
    {
    const currentUser = useContext(CurrentUserContext);

    function addCardsFilms() {
        const shortSearchFilms = likeFilms.filter(film => film.duration <= 40)

            return (seacrhShortFilms ? shortSearchFilms : likeFilms).map((movie) => {
                if(movie.owner === currentUser._id) {
                    return <MoviesCard 
                        film = {movie}
                        savedMovies = {true}
                        key = {movie._id}
                        popup = {popup}
                        openClosePopup = {openClosePopup}
                        searchError = {searchError}
                        setSearchError = {setSearchError}
                    />
                }
            })
        
    }

    function searchSubmit(e) {
        e.preventDefault();

        setIsLoading(true)

        if (search === "") 
            {
                setSearchError("Нужно ввести ключевое слово")
                openClosePopup()
                setIsLoading(false)
            }
        else    
                localStorage.setItem('search', JSON.stringify(search))
                mainApi.getMovise()
                    .then((savedMovies) => {
                        setLikeFilms(savedMovies.filter((movie) => { 
                            return movie.nameRU.includes(search)}))
                }).catch((err) => {
                    setSearchError(err)
                    openClosePopup()
                    console.log(err)
                })
                setIsErrorServer("")
                setAllSearch(search)
                setIsLoading(false)
    }


    return (
        <section className="savedMovies">

            <Header
                navBar={
                    <HeaderMain 
                        isHiddenMenuOpen={isHiddenMenuOpen}
                        onIsHiddenMenuOpen={onIsHiddenMenuOpen}
                        page = "savedMovies"
                    />}
                headerClassName={true}
            />
            <SearchForm 
                popup = {popup}
                openClosePopup = {openClosePopup}
                search = {search}
                searchHandler = {searchHandler}
                searchSubmit = {searchSubmit}
                searchError = {searchError}
                changeSearchShortFilms = {changeSearchShortFilms}
                seacrhShortFilms = {seacrhShortFilms}
            />
            <MoviesCardList 
                arrayFilms = "Тут будет массив сохранённых фильмов"
                savedMovies = {true}
                allSearch = {allSearch}
                isLoading = {isLoading}
                isErrorServer = {isErrorServer}
                addCardsFilms = {addCardsFilms}
                likeFilms = {likeFilms}
            />
            <Footer />

        </section>
    )
}

export default SavedMovies;