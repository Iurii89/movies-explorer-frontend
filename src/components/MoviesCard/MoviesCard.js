import "./MoviesCard.css";
import { useState } from "react";

function MoviesCard({film, savedMovies}) {

    const [isLike, setIsLike] = useState(false);

    function changeLike() {
        setIsLike(!isLike)
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
    

    return (
        <section className="moviesCard">

                    <div className="moviesCard__description">
                        <p className="moviesCard__name" data-tooltip={film.nameRU}>{shortNameFilmRu()}</p>
                        <p className="moviesCard__time">{time()}</p>
                        { !savedMovies ? 
                            <button 
                                className={`moviesCard__like ${isLike && "moviesCard__like_background-image_like-yes"}`}
                                onClick={changeLike} />
                            :
                            <button className="moviesCard__like moviesCard__delete" />}
                    </div>
                    
                    <img className="moviesCard__image" src={`https://api.nomoreparties.co${film.image.formats.thumbnail.url}`} alt="Фото фильма" />
                
        </section>
    )
}

export default MoviesCard;