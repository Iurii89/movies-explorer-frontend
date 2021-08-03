import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import savedFilmsLol from "../../utils/one.json";

function SavedMovies() {
    return (
        <section className="savedMovies">

            <Header 
                landing={false}
            />
            <SearchForm />
            <MoviesCardList 
                arrayFilms = {savedFilmsLol}
                savedMovies = {true}
            />
            <Footer />

        </section>
    )
}

export default SavedMovies;