import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";


function MoviesCardList({movies, arrayFilms, savedMovies}) {

    return (
        <section className="moviesCardList">
            <div className="moviesCardList__grid">
                {arrayFilms && arrayFilms.map(film => 
                    <MoviesCard 
                        film = {film}
                        savedMovies = {savedMovies}
                    />
                )}
            </div>

            {movies &&
                <button className="moviesCardList__button-more">Ещё</button>
            }

        </section>
    )
}

export default MoviesCardList;