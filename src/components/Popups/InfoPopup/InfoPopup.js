import "./InfoPopup.css";
import Yes from "../../../images/Yes.png";
import No from "../../../images/No.png";

function InfoPopup({popup, openClosePopup, text, yesOrNot}) {
    return (
        <section className={`infoPopup ${popup && "infoPopup_is-opened"}`}>
            <div className="infoPopup__container">
                <button
                    className="infoPopup__close-button"
                    type="button"
                    onClick={openClosePopup}
            ></button>
                <img className="infoPopup__infoTooltip-img" alt="Картинка" src={yesOrNot ? Yes : No}></img>
                <h2 className="infoPopup__infoTooltip-message">{text}</h2>

            </div>
        </section>
    )
}

export default InfoPopup;