import "./SignInUpForm.css";
import logo from "../../images/logo.png";
import { useHistory } from 'react-router-dom';


function SignInUpForm({login}) {
    const history = useHistory();

    return (
        <section className="signInUpForm">
            <img className="signInUpForm__logo" src={logo} alt="Логотип" onClick={()=> history.push('/')} />
            <h2 className="signInUpForm__name">{`${login ? "Рады видеть!" : "Добро пожаловать!"}`}</h2>

            <form className="signInUpForm__form">
                <div className="signInUpForm__input-border">
                    
                    {!login && 
                        <>
                            <label className="signInUpForm__label" htmlFor="signInUpForm__input-name">Имя</label>
                            <input className="signInUpForm__input" id="signInUpForm__input-name" name="name" type="text"  minLength="2" maxLength="20" required/>
                        </>
                    }

                    <label className="signInUpForm__label" htmlFor="signInUpForm__input-email">E-mail</label>
                    <input className="signInUpForm__input" id="signInUpForm__input-email" name="email" type="email" required/>

                    <label className="signInUpForm__label" htmlFor="signInUpForm__input-password">Пароль</label>
                    <input className="signInUpForm__input" id="signInUpForm__input-password" name="password" type="password" minLength="8" required/>
                </div>

                <div className="signInUpForm__button-border">
                    <button className="signInUpForm__button-submit" type="submit">{`${login ? "Войти" : "Зарегистрироваться"}`}</button>

                    <div className="signInUpForm__container-exit">
                        <p className="signInUpForm__text-exit">{`${login ? "Ещё не зарегистрированы?" : "Уже зарегистрированы?"}`}</p>
                        <button 
                            className="signInUpForm__button-exit" 
                            onClick={login ? ()=> history.push('/signup') : ()=> history.push('/signin')}>
                                {`${login ? "Регистрация" : "Войти"}`}
                        </button>
                    
                    </div>
                </div>
            </form>


        </section>
    )
}

export default SignInUpForm;