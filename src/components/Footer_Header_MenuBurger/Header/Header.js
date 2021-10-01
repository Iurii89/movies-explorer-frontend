import { React } from 'react';
import './Header.css';
import logo from "../../../images/logo.png";
import Redirect from '../../Other_Component/Redirect/Redirect';


function Header( {
        headerClassName, 
        navBar, 
    } ) {

    return (
        <>
            <header className={`header ${headerClassName && "header_background-color_white"}`}>

                <div className="header__border">
                    <div className="header__main">
                        <img className="header__logo" src={logo} alt="Логотип" onClick={Redirect().goLanding} />

                        {navBar}

                    </div>

                </div>

            </header>
        </>
    )
}

export default Header;