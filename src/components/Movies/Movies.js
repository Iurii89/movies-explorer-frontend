import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import allFilms from "../../utils/json.json";


function Movies({popup, openClosePopup}) {
    return (
        <section className="movies">
            <Header 
                landing= {false}
                page = "movies"
            />
            <SearchForm 
                popup = {popup}
                openClosePopup = {openClosePopup}
            />
            <MoviesCardList 
                movies={true}
                arrayFilms ={allFilms}
            />
            <Footer />
            {/* <Preloader /> */}
        </section>
    )
}

export default Movies;