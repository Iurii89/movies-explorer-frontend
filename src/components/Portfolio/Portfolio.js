import "./Portfolio.css";
import arrow from "../../images/arrow.png";

function Portfolio() {
    return (
        <section className="portfolio">

            <h3 className="portfolio__name">Портфолио</h3>

            <ul className="portfolio__list">
                <li className="portfolio__list-item">
                    <h4 className="portfolio__item-name">Статичный сайт</h4>
                    <img className="portfolio__item-icon" src={arrow} alt="Стрелка-ссылка"></img>
                </li>

                <li className="portfolio__list-item">
                    <h4 className="portfolio__item-name">Адаптивный сайт</h4>
                    <img className="portfolio__item-icon" src={arrow} alt="Стрелка-ссылка"></img>
                </li>

                <li className="portfolio__list-item">
                    <h4 className="portfolio__item-name portfolio_paddin-bottom_zero">Одностраничное приложение</h4>
                    <img className="portfolio__item-icon portfolio_align-self_flex-end" src={arrow} alt="Стрелка-ссылка"></img>
                </li>
            </ul>

        </section>
    )
}

export default Portfolio;