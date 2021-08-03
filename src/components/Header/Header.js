import './Header.css';
import logo from "../../images/logo.png";
import MenuBurger from '../MenuBurger/MenuBurger';
import { useHistory } from 'react-router-dom';


function Header( {landing} ) {
    const history = useHistory();
    return (
        <>
            <header className={`header ${!landing && "header_background-color_white"}`}>

                <div className="header__border">
                    <div className="header__main">
                        <img className="header__logo" src={logo} alt="Логотип" onClick={()=> history.push('/')} />
                        <div className="header__main-buttons">

                            {!landing && 
                                <>
                                    <div className="header__films">
                                        <button className="header__film-button" onClick={()=> history.push('/movies')}>Фильмы</button>
                                        <button className="header__seva-film-button" onClick={()=> history.push('/saved-movies')}>Сохранённые фильмы</button>
                                    </div>
                                    <button className="header__accaunt-button" onClick={()=> history.push('/profile')}>Аккаунт</button>
                                </>
                            }
                                
                        </div>
                        
                        {!landing && 
                            <button className="header__hidden-menu" />
                        }

                        {landing && 
                            <div className="header__landing-buttons">
                                <button className="header__registr-button" onClick={()=> history.push('/signup')}>Регистрация</button>
                                <button className="header__signin-button" onClick={()=> history.push('/signin')}>Войти</button>
                            </div>
                        }
                        
                    </div>

                </div>

            </header>

            <MenuBurger />
        </>
    )
}

export default Header;