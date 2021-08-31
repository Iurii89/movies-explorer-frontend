import "./SigninUpForm.css";
import logo from "../../../../images/logo.png";
import Redirect from "../../../Other_Component/Redirect/Redirect";
import ErrorTextForUserUi from "../../../Other_Component/ErrorTextForUserUi/ErrorTextForUserUi";

function SignInUpForm({ 
    formName, 
    component, 
    onSubmit, 
    buttonName, 
    textExit, 
    redirectExit, 
    buttonExitName,
    values,
    handleChangeEmail,
    handleChangePassword,
    errors,
    isValid,
    messsageErrorSubmitForm,
    }) {

    return (
        <section className="signInUpForm">
            <img className="signInUpForm__logo" src={logo} alt="Логотип" onClick={Redirect().goLanding} />
            <h2 className="signInUpForm__name">{formName}</h2>

            <form 
                className="signInUpForm__form" noValidate
                onSubmit={onSubmit}
            >
                <div className="signInUpForm__input-border">
                    
                    { component }

                    <label className="signInUpForm__label" htmlFor="signInUpForm__input-email">E-mail</label>
                    <input 
                        className="signInUpForm__input" 
                        id="signInUpForm__input-email" 
                        name="email" 
                        type="email" 
                        value={values.email}
                        onChange = {e => handleChangeEmail(e)}
                    />
                    {(errors.email !== "") && <ErrorTextForUserUi text={errors.email} />}


                    <label className="signInUpForm__label" htmlFor="signInUpForm__input-password">Пароль</label>
                    <input 
                        className="signInUpForm__input" 
                        id="signInUpForm__input-password" 
                        name="password" 
                        type="password" 
                        value={values.password}
                        onChange={e => handleChangePassword(e)}
                        />
                    {(errors.password !== "") && <ErrorTextForUserUi text={errors.password} />}
                </div>

                <div className="signInUpForm__button-border">
                    {!(messsageErrorSubmitForm === "") && <ErrorTextForUserUi text={`Сервер вернул ошибку: ${messsageErrorSubmitForm}`} />}
                    <button 
                        className={`signInUpForm__button-submit ${!isValid && "signInUpForm__button-submit_disabled"}`} 
                        disabled ={!isValid} 
                        type="submit">{buttonName}
                    </button>

                    <div className="signInUpForm__container-exit">
                        <p className="signInUpForm__text-exit">{ textExit}</p>
                        <button 
                            className="signInUpForm__button-exit" 
                            onClick={ redirectExit}>
                                {buttonExitName}
                        </button>
                    
                    </div>
                </div>
            </form>
        </section>
    )
}

export default SignInUpForm;