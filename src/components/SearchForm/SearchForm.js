import "./SearchForm.css";

function SearchForm() {
    return (
        <section className="searchForm">
            <form 
                className="searchForm__form"
                action="#"
                name="searchForm"
                >
                <input className="searchForm__input-main" placeholder="Фильм" type="text" name="input-main" required></input>
                <button className="searchForm__button-search">Найти</button>

                <input className="searchForm__checkbox-shortFilms" type="checkbox" name="checkbox-shortFilms" id="checkbox-shortFilms"></input>
                <label className="searchForm__checkbox-shortFilm-label" htmlFor="checkbox-shortFilms"></label>

                <p className="searchForm__text-checkbox-shortFilms">Короткометражки</p>

                
            </form>
            <div className="searchForm__line-bottom" />
        </section>
    )
}

export default SearchForm;  