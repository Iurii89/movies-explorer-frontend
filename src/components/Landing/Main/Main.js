import { React } from "react";
import Header from "../../Footer_Header_MenuBurger/Header/Header";
import AboutProject from "../AboutProject/AboutProject";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Footer from "../../Footer_Header_MenuBurger/Footer/Footer";
import HeaderLanding from "../../Footer_Header_MenuBurger/Header/HeaderLanding/HeaderLanding";
import HeaderMain from "../../Footer_Header_MenuBurger/Header/HeaderMain/HeaderMain";

function Main({loggedIn}) {

    return (
        <>
            <Header 
                navBar={ loggedIn ? <HeaderMain /> : <HeaderLanding />}
                headerClassName={loggedIn && true}
            />
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
            <Footer />
        </>
    )
}

export default Main;