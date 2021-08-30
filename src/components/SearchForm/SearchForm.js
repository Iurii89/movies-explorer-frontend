import "./SearchForm.css";
import { React, useState } from 'react';
import InfoPopup from "../InfoPopup/InfoPopup";
import moviesApi from "../../utils/MoviesApi";

function SearchForm({popup, openClosePopup}) {
    const [search, setSearch] = useState("");
    const [searchError, setSearchError] = useState("");

    function searchHandler(e) {
        setSearch(e.target.value)
    }

    function searchSubmit(e) {
        e.preventDefault();
        if (search === "") 
            {
                setSearchError("Нужно ввести ключевое слово")
                openClosePopup()
            }
            return moviesApi.getAllFilms()
    }

    return (
        <section className="searchForm">
            <form 
                className="searchForm__form"
                action="#"
                name="searchForm"
                onSubmit = {searchSubmit}
                noValidate
            >
                <input 
                    className="searchForm__input-main" 
                    placeholder="Фильм" 
                    type="text" 
                    name="input-main"
                    value = {search}
                    onChange = {searchHandler}
                ></input>

                <button className="searchForm__button-search">Найти</button>

                <input className="searchForm__checkbox-shortFilms" type="checkbox" name="checkbox-shortFilms" id="checkbox-shortFilms"></input>
                <label className="searchForm__checkbox-shortFilm-label" htmlFor="checkbox-shortFilms"></label>

                <p className="searchForm__text-checkbox-shortFilms">Короткометражки</p>

                
            </form>
            <div className="searchForm__line-bottom" />

            <InfoPopup 
                popup = {popup}
                openClosePopup = {openClosePopup}
                text = {searchError}
            />
        </section>
    )
}

export default SearchForm;  