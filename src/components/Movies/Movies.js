import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import allFilms from "../../utils/json.json";


function Movies() {
    return (
        <section className="movies">
            <Header 
                landing= {false}
            />
            <SearchForm />
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