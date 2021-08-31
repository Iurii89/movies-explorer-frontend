import "./MenuBurger.css";
import Redirect from "../../Other_Component/Redirect/Redirect";


function MenuBurger({openMenu, closeMenu, page}) {

    return (
        <div className={`menuBurger ${openMenu && "menuBurger_visabiliti_visible"}`}>
            <button className="menuBurger__close-button" onClick={closeMenu}/>
            <button className="menuBurger__main-button" onClick={Redirect().goLanding}>Главная</button>
            <button 
                className={`menuBurger__main-button ${page === "movies" && "menuBurger__border-bottom-line"}`} 
                onClick={Redirect().goMovies}>

                Фильмы

            </button>
            <button className={`menuBurger__main-button ${page === "savedMovies" && "menuBurger__border-bottom-line"}`} onClick={Redirect().goSavedMovies}>Сохранённые фильмы</button>
            <button className="menuBurger__account-button" onClick={Redirect().goProfile}>Аккаунт</button>
        </div>
    )
}

export default MenuBurger;