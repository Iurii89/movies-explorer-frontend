import React from "react";
import "../SigninUpForm";
import ErrorTextForUserUi from "../../../../Other_Component/ErrorTextForUserUi/ErrorTextForUserUi";

function SigninUpFormRegister ({ handleChangeName, values, errors })  {
    return (
        <>
            <label className="signInUpForm__label" htmlFor="signInUpForm__input-name">Имя</label>
            <input 
                className="signInUpForm__input" 
                id="signInUpForm__input-name" 
                name="name" 
                type="text"
                value={values.name}
                onChange={e => handleChangeName(e)}
            />
            {errors.name !== "" && <ErrorTextForUserUi text={errors.name} />}
        </>
    )
}

export default SigninUpFormRegister;