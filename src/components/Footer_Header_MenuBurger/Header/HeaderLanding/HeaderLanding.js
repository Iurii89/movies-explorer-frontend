import React from "react";
import "./HeaderLanding.css";
import Redirect from "../../../Other_Component/Redirect/Redirect";

const HeaderLanding = () => {
    return (
    
        <div className="headerLanding__landing-buttons">
            <button className="headerLanding__registr-button" onClick={Redirect().goRegister}>Регистрация</button>
            <button className="headerLanding__signin-button" onClick={Redirect().goLogin}>Войти</button>
        </div>
    
)}

export default HeaderLanding;