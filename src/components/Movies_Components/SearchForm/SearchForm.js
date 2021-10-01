import "./SearchForm.css";
import React from 'react';
import InfoPopup from "../../Popups/InfoPopup/InfoPopup";

function SearchForm({
        popup, 
        openClosePopup, 
        search, 
        searchHandler, 
        searchError,
        searchSubmit,
        changeSearchShortFilms,
        seacrhShortFilms,
    }) 
    
    {

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
                    defaultValue = {search}
                    onChange = {searchHandler}
                ></input>

                <button className="searchForm__button-search">Найти</button>

                <input 
                    className="searchForm__checkbox-shortFilms" 
                    type="checkbox" 
                    name="checkbox-shortFilms" 
                    id="checkbox-shortFilms"
                    onChange = {changeSearchShortFilms}
                    checked = {seacrhShortFilms}
                />
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