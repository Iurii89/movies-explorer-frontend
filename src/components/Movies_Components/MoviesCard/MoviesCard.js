import React, { useContext, useEffect } from "react";
import "./MoviesCard.css";
import { useState } from "react";
import mainApi from "../../../utils/MainApi";
import { CurrentUserContext } from "../../Other_Component/contexts/CurrentUserContext";
import InfoPopup from "../../Popups/InfoPopup/InfoPopup";

function MoviesCard({
    film, 
    savedMovies, 
    likeIt,
    popup,
    openClosePopup,
    searchError,
    setSearchError
    }) {
    const currentUser = useContext(CurrentUserContext);

    const [isLike, setIsLike] = useState(false);

    useEffect(() => {
        likeIt && like()
    }, [likeIt])

    function like() {
        setIsLike(true)
    }
    function disLike() {
        setIsLike(false)
    }

    //Преобразуем длительность фильма в нужный формат
    const time = function getTimeFromMins() {
                    let hours = Math.trunc(film.duration/60);
                    let minutes = film.duration % 60;
                    return hours + 'ч ' + minutes + 'м';
                };

    //Реалиизация всплывающего окна названия фильма
    let tooltipElem;

    document.onmouseover = function(event) {
        let target = event.target;

        let tooltipHtml = target.dataset.tooltip;
        if (!tooltipHtml) return;

        tooltipElem = document.createElement('div');
        tooltipElem.className = 'tooltip';
        tooltipElem.innerHTML = tooltipHtml;
        document.body.append(tooltipElem);

        let coords = target.getBoundingClientRect();

        let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
        if (left < 0) left = 0;

        let top = coords.top - tooltipElem.offsetHeight - 5;
        if (top < 0) { 
            top = coords.top + target.offsetHeight + 5;
        }

        tooltipElem.style.left = left + 'px';
        tooltipElem.style.top = top + 'px';
    };

    document.onmouseout = function(e) {

        if (tooltipElem) {
            tooltipElem.remove();
            tooltipElem = null;
        }
    };
    //Окончание реализации всплывающего окна названия фильма

    //Сокращение названия фильма
    const shortNameFilmRu = 
        function () {
            if(film.nameRU.length > 30) 
                {return film.nameRU.slice(0, 30) + "..."}
                else return film.nameRU
        }


    function putRemoveLike() {
        mainApi.getMovise()
            .then((savedMovies) => {
                const filmIsPresent = savedMovies.some((movie) => {
                    if(movie.movieId === film.id && movie.owner === currentUser._id) {
                        return true
                    } else return false
                })
                if(filmIsPresent){
                    mainApi.deleteCard(film.id)
                    disLike()
                } else {
                    mainApi.sendSavedMovies(film)
                    like()
                }
            }).catch((err) => {
                setSearchError(err)
                openClosePopup()
                console.log(err)
            })
    }


    function deleteFilm(e) {
        mainApi.deleteCard(film.movieId)
        .then(() => {
            e.target.parentElement.parentElement.remove()
        })
        .catch((err) => {
            setSearchError(err)
            openClosePopup()
            console.log(err)
        })
    }

    function openVideo() {
        window.open(film.trailerLink ? film.trailerLink : film.trailer)
    }
    

    return (
        <section className="moviesCard">

                    <div className="moviesCard__description">
                        <p className="moviesCard__name" data-tooltip={film.nameRU}>{shortNameFilmRu()}</p>
                        <p className="moviesCard__time">{time()}</p>
                        { !savedMovies ? 
                            <button 
                                className={`moviesCard__like ${isLike && "moviesCard__like_background-image_like-yes"}`}
                                onClick={putRemoveLike} />
                            :
                            <button 
                                className="moviesCard__like moviesCard__delete" 
                                onClick = {deleteFilm}
                                />}
                    </div>
                    
                    <img 
                        className="moviesCard__image" src={savedMovies ? film.image : `https://api.nomoreparties.co${film.image.formats.thumbnail.url}`} 
                        alt="Фото фильма"
                        onClick = {openVideo}
                        />
                
                <InfoPopup 
                    popup = {popup}
                    openClosePopup = {openClosePopup}
                    text = {searchError}
                />
        </section>
    )
}

export default MoviesCard;