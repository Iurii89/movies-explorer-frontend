import "./FormProfile.css";
import React from "react";
import ErrorTextForUserUi from "../../../Other_Component/ErrorTextForUserUi/ErrorTextForUserUi";


function FormProfile({
    onSubmit,
    currentUser,
    isValid,
    values,
    handleChangeName,
    handleChangeEmail,
    errors,
    messsageErrorSubmitForm,
    onEditProfile,
    editProfile,
    signOut,
    }) {


    return (
        <section className="formProfile">
            <form 
                className="formProfile__form" 
                onSubmit={onSubmit}
                noValidate
            >
                <h2 className="formProfile__form-name">{`Привет, ${currentUser.name}!`}</h2>

                <div className="formProfile__container-name">
                    <label className="formProfile__input-name" htmlFor="formProfile__input-name">Имя</label>
                    
                        <input 
                            className="formProfile__input"
                            type="text" 
                            id="formProfile__input-name"
                            name="name"
                            placeholder={currentUser.name}
                            disabled={!editProfile}
                            value={values.name}
                            onChange={e => handleChangeName(e)}
                            />
                    
                </div>
                {(errors.name !== "") && <ErrorTextForUserUi text={errors.name} />}

                <div className="formProfile__container-email">
                    <label className="formProfile__input-name" htmlFor="formProfile__input-email">E-mail</label>

                        <input 
                            className="formProfile__input" 
                            type="email" 
                            id="formProfile__input-email" 
                            name="email"
                            placeholder={currentUser.email} 
                            disabled={!editProfile} 
                            value={values.email}
                            onChange = {e => handleChangeEmail(e)}
                            />

                </div>
                {(errors.email !== "") && <ErrorTextForUserUi text={errors.email} />}

                {!(messsageErrorSubmitForm === "") && <ErrorTextForUserUi text={`Сервер вернул ошибку: ${messsageErrorSubmitForm}`} />}
                {editProfile && (<button className={`formProfile__button-submit ${!isValid && "formProfile__button-submit_disabled"}`} type="submit" disabled ={!isValid} >Сохранить</button>)}
            
            </form>

            {!editProfile && 
            <>
                <button className="formProfile__button-edit"  onClick={onEditProfile}>Редактировать</button>
                <button className="formProfile__button-exit" onClick={signOut}>Выйти из аккаунта</button>
            </>
            }
            

        </section>
    )
}
export default FormProfile;