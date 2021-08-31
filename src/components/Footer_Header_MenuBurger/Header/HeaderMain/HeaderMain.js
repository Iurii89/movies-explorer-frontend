import { React } from "react";
import "./HeaderMain.css";
import Redirect from "../../../Other_Component/Redirect/Redirect";
import MenuBurger from "../../MenuBurger/MenuBurger";

const HeaderMain = ({onIsHiddenMenuOpen, isHiddenMenuOpen, page}) => {

    return (
    <>
        <div className="headerMain__main-buttons">
                <div className="headerMain__films">
                    <button className="headerMain__film-button" onClick={Redirect().goMovies}>Фильмы</button>
                    <button className="headerMain__seva-film-button" onClick={Redirect().goSavedMovies}>Сохранённые фильмы</button>
                </div>
                <button className="headerMain__accaunt-button" onClick={Redirect().goProfile}>Аккаунт</button>
        </div>
        
        <button className="headerMain__hidden-menu" onClick={onIsHiddenMenuOpen}/>
    
        <MenuBurger
                openMenu = {isHiddenMenuOpen}
                closeMenu = {onIsHiddenMenuOpen}
                page = {page}
        />

    </>
)}

export default HeaderMain;