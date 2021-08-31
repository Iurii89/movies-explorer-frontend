import React from "react";
import { useHistory } from "react-router-dom";
import mainApi from "../../../utils/MainApi";
import Redirect from "../../Other_Component/Redirect/Redirect";
import SignInUpForm from "../Forms/SignInUpForm/SigninUpForm";
import SigninUpFormRegister from "../Forms/SignInUpForm/SigninUpFormRegister/SigninUpFormRegister";

function Register({ setLoggedIn, setCurrentUser, currentUser }) {

    const [values, setValues] = React.useState({
        name: "",
        email: "",
        password: ""
    });
    const [errors, setErrors] = React.useState({});
    const isValid = (errors.name === "") && (errors.email === "") && (errors.password === "");
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

    const handleChangeName = (e) => {
        const targetValue = e.target.value;
        const regexName = /[^a-zа-яё -]/iu

        setValues({...values, name: targetValue})
        if ( targetValue === "" ) {
            setErrors({...errors, name: "Имя не может быть пустым"})
        } else if(targetValue.length < 2) {
            setErrors({...errors,  name: "Имя должно состоять минимум из 2 символов" })
        } else if(targetValue.length > 20) {
            setErrors({...errors,  name: "Имя не должно быть больше 20 символов" })
        } else if(regexName.test(String(targetValue).toLowerCase())){
            setErrors({...errors, name: "Используются недопустимые символы"})
        } else setErrors({...errors,  name: "" })
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

    const onSubmitRegister = (e) => {
        e.preventDefault()

        mainApi.register(values.name, values.email, values.password)
        .then((res) => {
            if (!res.ok) {
                setMesssageErrorSubmitForm(res.statusText)
                return Promise.reject(`Error: ${res}`);
            }

            mainApi.login(values.email, values.password)
                .then((res) => {
                    setMesssageErrorSubmitForm("")
                    if(!res.ok) {
                        return Promise.reject(`Error: ${res}`);
                    }
                    return res.json()
                }).then((res) => {
                    localStorage.setItem('token', res.token)
                    mainApi.getUserData()
                    .then((res) => {
                        if (!res.ok) {
                            return Promise.reject(`Error: ${res.status}`);
                        }
                        return res.json()
                        }).then((res) => {
                            setCurrentUser(res)
                            setLoggedIn(true)
                            history.push('/')
                            history.push('/movies')
                        })
                })
        }).catch((err) => {
            console.log(err)
            setMesssageErrorSubmitForm(`${err}, возможно возникли проблемы с подключение к интернету`)
        })
    }


    return (
        <section className="register">
            <SignInUpForm 
                formName = "Добро пожаловать!"
                component = {
                    <SigninUpFormRegister 
                        handleChangeName= {handleChangeName}
                        values = {values}
                        errors = {errors}
                    />} 
                onSubmit = {onSubmitRegister} 
                buttonName = "Зарегистрироваться" 
                textExit = "Уже зарегистрированы?" 
                redirectExit = {Redirect().goLogin}
                buttonExitName = "Войти"
                values = {values}
                errors = {errors}
                handleChangeEmail = {handleChangeEmail}
                handleChangeName = {handleChangeName}
                handleChangePassword = {handleChangePassword}
                isValid = {isValid}
                messsageErrorSubmitForm = {messsageErrorSubmitForm}
            />
        </section>
    )
}

export default Register;