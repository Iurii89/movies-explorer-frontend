import "./FormProfile.css";
import { useState, React } from "react";
import { useHistory } from 'react-router-dom';


function FormProfile() {
    const history = useHistory();

    const [editProfile, setEditProfile ] = useState(false);
    const [state, setState] = useState({
        name: "Братец Баджранги",
        email: "india@go.indostan"
    })

    function onEditProfile() {
        setEditProfile(true);
    }

    function handleChange(e) {
        const {name, value} = e.target;
        setState({
            ...state,
            [name]: value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        setEditProfile(false)
    }



    return (
        <section className="formProfile">
            <form className="formProfile__form" onSubmit={handleSubmit}>
                <h2 className="formProfile__form-name">Привет, Братец Баджранги!</h2>

                <div className="formProfile__container-name">
                    <label className="formProfile__input-name" htmlFor="formProfile__input-name">Имя</label>
                    <input 
                        className="formProfile__input"
                        type="text" 
                        id="formProfile__input-name"
                        name="name"
                        minLength="2" 
                        maxLength="20" 
                        placeholder={state.name}
                        onChange={handleChange}
                        required
                        disabled={!editProfile && true} 
                        />
                </div>

                <div className="formProfile__container-email">
                    <label className="formProfile__input-name" htmlFor="formProfile__input-email">E-mail</label>
                    <input 
                        className="formProfile__input" 
                        type="email" 
                        id="formProfile__input-email" 
                        name="email"
                        placeholder={state.email} 
                        onChange={handleChange}
                        required
                        disabled={!editProfile && true} />
                </div>

                {editProfile && (<button className="formProfile__button-submit" type="submit"  >Сохранить</button>)}
            
            </form>

            {!editProfile && 
            <>
                <button className="formProfile__button-edit"  onClick={onEditProfile}>Редактировать</button>
                <button className="formProfile__button-exit" onClick={()=> history.push('/signin')}>Выйти из аккаунта</button>
            </>
            }
            

        </section>
    )
}
export default FormProfile;