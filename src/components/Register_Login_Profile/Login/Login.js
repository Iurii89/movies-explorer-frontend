import React from "react";
import { useHistory } from "react-router-dom";
import mainApi from "../../../utils/MainApi";
import Redirect from "../../Other_Component/Redirect/Redirect";
import SignInUpForm from "../Forms/SignInUpForm/SigninUpForm";

function Login({setLoggedIn, setCurrentUser}) {

    const [values, setValues] = React.useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = React.useState({});
    const isValid = (errors.email === "") && (errors.password === "");
    const [messsageErrorSubmitForm, setMesssageErrorSubmitForm] = React.useState("");
    const history = useHistory();


    const handleChangeEmail = (e) => {
        const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const targetValue = e.target.value;

        setValues({...values, email: targetValue})
        if(targetValue ===  "") {
            setErrors({...errors, email: "Email не может быть пустым"})
        } else if(!regexEmail.test(String(targetValue).toLowerCase())) {
            setErrors({...errors, email: "Требуется ввести Email"})
        } else setErrors({...errors, email: ""})
    }

    const handleChangePassword = (e) => {
        const targetValue = e.target.value;

        setValues({...values, password: targetValue})
        if(targetValue === "") {
            setErrors({...errors, password: "Пароль не может быть пустым"})
        } else if(targetValue.length < 8) {
            setErrors({...errors, password: "Пароль должен состоять минимум из 8 символов"})
        } else setErrors({...errors, password: ""})
    }

    const onSubmitLogin = (e) => {
        e.preventDefault()

        mainApi.login(values.email, values.password)
            .then((res) => {
                if (!res.ok) {
                    setMesssageErrorSubmitForm(res.statusText)
                    return Promise.reject(`Error: ${res}`);
                }
                setMesssageErrorSubmitForm("")
                return res.json()
            }).then((res) => {
                localStorage.setItem('token', res.token)
                setLoggedIn(true)
                mainApi.getUserData()
                .then((res) => {
                    if (!res.ok) {
                        setMesssageErrorSubmitForm(res.statusText)
                        return Promise.reject(`Error: ${res.status}`);
                    }
                    return res.json()
                })
                    .then((user) => {
                        setCurrentUser(user)
                        history.push('/movies')
                    })
            }).catch((err) => {
                setMesssageErrorSubmitForm(`${err}, возможно возникли проблемы с подключение к интернету`)
                console.log(err)
        })
    }

    return (
        <section className="login">
            <SignInUpForm
                formName = "Рады видеть!"
                onSubmit = {onSubmitLogin} 
                buttonName = "Войти" 
                textExit = "Ещё не зарегистрированы?" 
                redirectExit = {Redirect().goRegister}
                buttonExitName = "Регистрация"
                values = {values}
                errors = {errors}
                handleChangeEmail = {handleChangeEmail}
                handleChangePassword = {handleChangePassword}
                isValid = {isValid}
                messsageErrorSubmitForm = {messsageErrorSubmitForm}
            />
        </section>
    )
}

export default Login;