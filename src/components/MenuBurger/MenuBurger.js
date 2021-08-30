import "./MenuBurger.css";
import { useHistory } from 'react-router-dom';


function MenuBurger({openMenu, closeMenu, page}) {
    const history = useHistory();

    return (
        <div className={`menuBurger ${openMenu && "menuBurger_visabiliti_visible"}`}>
            <button className="menuBurger__close-button" onClick={closeMenu}/>
            <button className="menuBurger__main-button" onClick={()=> history.push('/')}>Главная</button>
            <button className={`menuBurger__main-button ${page === "movies" && "menuBurger__border-bottom-line"}`} onClick={()=> history.push('/movies')}>Фильмы</button>
            <button className={`menuBurger__main-button ${page === "savedMovies" && "menuBurger__border-bottom-line"}`} onClick={()=> history.push('/saved-movies')}>Сохранённые фильмы</button>
            <button className="menuBurger__account-button" onClick={()=> history.push('/profile')}>Аккаунт</button>
        </div>
    )
}

export default MenuBurger;