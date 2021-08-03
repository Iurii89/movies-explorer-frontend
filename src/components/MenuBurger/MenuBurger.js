import "./MenuBurger.css";
import "../Header/Header.css";

function MenuBurger() {
    return (
        <div className="menuBurger">
            <button className="menuBurger__close-button" />
            <button className="menuBurger__main-button">Главная</button>
            <button className="menuBurger__main-button">Фильмы</button>
            <button className="menuBurger__main-button">Сохранённые фильмы</button>
            <button className="menuBurger__account-button header__accaunt-button menuBurger__account-button_padding-top_621px">Аккаунт</button>
        </div>
    )
}

export default MenuBurger;