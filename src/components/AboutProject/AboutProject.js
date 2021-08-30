import "./AboutProject.css";

function AboutProject() {
    return (
        <section className="aboutProject">

            <h2 className="aboutProject__name">О проекте</h2>

            <div className="aboutProject__description">
                <h3 className="aboutProject__title-descriptions">Дипломный проект включал 5 этапов</h3>
                <h3 className="aboutProject__title-descriptions">На выполнение диплома ушло 5 недель</h3>
                <p className="aboutProject__text-descriptions">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                <p className="aboutProject__text-descriptions">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>

            <div className="aboutProject__infographics">
                <h3 className="aboutProject__title-infographics aboutProject_background_green">1 неделя</h3>
                <h3 className="aboutProject__title-infographics aboutProject_background_grey">4 недели</h3>
                <p className="aboutProject__text-infographics">Back-end</p>
                <p className="aboutProject__text-infographics">Front-end</p>
            </div>

        </section>
    )
}

export default AboutProject;