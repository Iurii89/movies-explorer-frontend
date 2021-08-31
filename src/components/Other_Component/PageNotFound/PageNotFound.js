import "./PageNotFound.css";
import { useHistory } from 'react-router-dom';


function PageNotFound() {
    const history = useHistory();

    return (
        <section className="pageNotFound">
            <h2 className="pageNotFound__name">404</h2>
            <p className="pageNotFound__description">Страница не найдена</p>
            <button className="pageNotFound__button-back" onClick={() => history.goBack()}>Назад</button>
        </section>
    )
}

export default PageNotFound;