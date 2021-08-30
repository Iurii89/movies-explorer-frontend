import FormProfile from "../FormProfile/FormProfile";
import Header from "../Header/Header";
import "./Profile.css";
import { React } from "react";

function Profile() {
    return (
        <section className="profile">
            <Header />
            <FormProfile />
        </section>
    )
}

export default Profile;