import "./AboutMe.css";
import "../AboutProject/AboutProject.css";
import avatar from "../../images/avatar.png";

function AboutMe() {
    return (
        <section className="aboutMe">
            <h2 className="aboutMe__name aboutProject__name">Студент    </h2>
            <h3 className="aboutMe__name-student">Юрий</h3>
            <p className="aboutMe__profession">Фронтенд-разработчик, 30 лет</p>
            <p className="aboutMe__text-descriptions">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
                                                    и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
            <ul className="aboutMe__social-list">
                <li className="aboutMe__social-item">Facebook</li>
                <li className="aboutMe__social-item">Girhub</li>
            </ul>
            <img className="aboutMe__photo" src={avatar} alt="Фото студента" />
        </section>
    )
}

export default AboutMe;