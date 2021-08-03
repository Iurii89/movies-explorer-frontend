import "./Footer.css";

function Footer() {
    return (
        <section className="footer">
            
            <h2 className="footer__name">Учебный проект Яндекс.Практикум х BeatFilm.</h2>

            <div className="footer__main-container">
                <p className="footer__year">© 2021</p>

                <ul className="footer__list-links">
                    <li className="footer__link"><a className="footer__link" href="https://praktikum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a></li>
                    <li className="footer__link"><a className="footer__link" href="https://github.com/Iurii89" target="_blank" rel="noreferrer">Github</a></li>
                    <li className="footer__link"><a className="footer__link" href="https://www.facebook.com/profile.php?id=100001148821441" target="_blank" rel="noreferrer">Facebook</a></li>
                </ul>

            </div>
            
        </section>
    )
}

export default Footer;