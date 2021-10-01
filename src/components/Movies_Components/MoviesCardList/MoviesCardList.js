import "./MoviesCardList.css";
import React from "react";
import Preloader from "../../Other_Component/Preloader/Preloader";
import ErrorTextForUserUi from "../../Other_Component/ErrorTextForUserUi/ErrorTextForUserUi";


function MoviesCardList({
    allSearch, 
    isLoading, 
    isErrorServer, 
    sortArrayFitScreenWidth,
    addCardsFilms,
    showButtonMoreFilms,
    movies,
    likeFilms,
    }) 
    
{

    return (
        <section className="moviesCardList">
            {isLoading && <Preloader />}
            {(allSearch !=="" && isErrorServer === "" && (movies ? sortArrayFitScreenWidth().length === 0 : likeFilms.length === 0)) && <ErrorTextForUserUi text="Ничего не найдено" />}
            {isErrorServer !== "" && <ErrorTextForUserUi text="Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз" />}
            
            <div className="moviesCardList__grid">
                {
                    addCardsFilms()
                }
            </div>
                {
                    movies && showButtonMoreFilms()
                }
        </section>
    )
}

export default MoviesCardList;