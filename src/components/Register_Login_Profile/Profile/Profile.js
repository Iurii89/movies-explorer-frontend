import React, { useState, useContext } from "react";
import { useHistory } from 'react-router-dom';
import "./Profile.css";
import FormProfile from "../Forms/FormProfile/FormProfile";
import Header from "../../Footer_Header_MenuBurger/Header/Header";
import HeaderMain from "../../Footer_Header_MenuBurger/Header/HeaderMain/HeaderMain";
import mainApi from "../../../utils/MainApi";
import { CurrentUserContext } from "../../Other_Component/contexts/CurrentUserContext";
import InfoPopup from "../../Popups/InfoPopup/InfoPopup";

function Profile({
    setCurrentUser, 
    isHiddenMenuOpen, 
    onIsHiddenMenuOpen, 
    offLoggedIn,
    popup,
    openClosePopup,
    text,
    yesOrNot,
    }) {
    const currentUser = useContext(CurrentUserContext);
    const history = useHistory();

    const [values, setValues] = React.useState({
        email: "",
        name: ""
    });
    const [errors, setErrors] = React.useState({});
    const [messsageErrorSubmitForm, setMesssageErrorSubmitForm] = React.useState("");
    const [editProfile, setEditProfile ] = useState(false);
    
    const isValid = (errors.email === "") && (errors.name === "") && (values.name !== currentUser.name) && (values.email !== currentUser.email);


    function onEditProfile() {
        setEditProfile(true);
    }

    function signOut(){
        localStorage.removeItem('token');
        localStorage.removeItem('arrayMovies');
        localStorage.removeItem('search');
        offLoggedIn();
        history.push('/');
    }

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

    const handleSubmit = (e) => {
        e.preventDefault()

        setEditProfile(false)

        mainApi.updateUser(values.email, values.name)
            .then((res) => {
                if (!res.ok) {
                    setMesssageErrorSubmitForm(res.statusText)
                    return Promise.reject(`Error: ${res}`);
                } return res.json();
            }).then ((res) => {
                setMesssageErrorSubmitForm("")
                setCurrentUser(res.data)
                openClosePopup()
            }).catch((err) => {
                console.log(err)
                setMesssageErrorSubmitForm(`${err}, возможно возникли проблемы с подключение к интернету`)
            })
    }
    
    return (
        <section className="profile">
            <Header 
                navBar={
                    <HeaderMain
                        isHiddenMenuOpen={isHiddenMenuOpen}
                        onIsHiddenMenuOpen={onIsHiddenMenuOpen}
                    />}
                headerClassName={true}
            />
            <FormProfile 
                onSubmit ={handleSubmit}
                values = {values}
                errors = {errors}
                handleChangeEmail = {handleChangeEmail}
                handleChangeName = {handleChangeName}
                isValid = {isValid}
                messsageErrorSubmitForm = {messsageErrorSubmitForm}
                onEditProfile = {onEditProfile}
                editProfile = {editProfile}
                signOut = {signOut}
                currentUser = {currentUser}
            />
            <InfoPopup 
                popup = {popup}
                openClosePopup = {openClosePopup}
                text = {text}
                yesOrNot = {yesOrNot}
            />
        </section>
    )
}

export default Profile;