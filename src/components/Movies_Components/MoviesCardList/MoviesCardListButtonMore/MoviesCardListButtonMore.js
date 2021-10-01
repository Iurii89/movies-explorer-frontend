import React from "react";
import "./MoviesCardListButtonMore.css";


const MoviesCardListButtonMore = ({downloadMoreFilms}) => {
    return (
        <button className="moviesCardListButtonMore__button-more" onClick={downloadMoreFilms}>Ещё</button>
    )
}

export default MoviesCardListButtonMore;