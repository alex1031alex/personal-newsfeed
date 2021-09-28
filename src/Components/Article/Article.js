import React from "react";
import './Article.css';
import { RelatedSmallArticle } from "../RelatedSmallArticle/RelatedSmallArticle";
import { SingleLineTitleArticle } from "../SingleLineTitleArticle/SingleLineTitleArticle";

export const Article = () => {
    return (
        <section className="article-page">
            <article className="article">
                <section className="article__hero" style={{ backgroundImage: 'url("http://placeimg.com/1920/1080/any")' }}>
                    <div className="container article__hero-content">
                        <div className="grid">
                            <h1 className="article__hero-title">Баскетбольный сезон стартует с очередной сенсации, которая шокировала фанатов спорта</h1>
                        </div>

                        <div className="grid">
                            <span className="article-category article__category">Новости</span>
                            <span className="article-date article__date">9 июля</span>
                        </div>
                    </div>
                </section>

                <div className="grid container article__main">
                    <div className="article__content">
                        <div className="article__title-container">
                            <h1 className="article__title">Баскетбольный сезон стартует с очередной сенсации, которая шокировала фанатов спорта</h1>

                            <div className="grid">
                                <span className="article-category article__category">Новости</span>
                                <span className="article-date article__date">9 июля</span>
                            </div>
                        </div>


                        <p>Звезда баскетбола Неймар Джеймс объявил о новой рекламной акции у себя в инстаграмме, чем шокировал подписчиков. Каждый, кто пожертвует 200 долларов на развитие детских спортивных секций у себя в городе получит...</p>
                        <p>Наши баскетболистки прекрасно шли по дистанции, но в решающий момент сплоховали.</p>
                        <img src="http://placeimg.com/1000/500/any" />
                        <p>Победа США получилась слишком лёгкой. Американки с самого начала захватили инициативу и не давали России ни малейшего шанса совершить камбэк. Появилась хоть призрачная надежда на спасение, но американки сразу же попали из-за дуги и фактически сняли все вопросы — шансов отыграться при 12:17 не было.</p>
                        <img src="http://placeimg.com/1000/500/any" />
                    </div>

                    <div className="article__small-column">
                        <RelatedSmallArticle />
                        <RelatedSmallArticle />
                        <RelatedSmallArticle />
                        <RelatedSmallArticle />
                        <RelatedSmallArticle />
                        <RelatedSmallArticle />
                    </div>
                </div>
            </article>

            <section className="article-page__related-articles">
                <div className="container">
                    <h2 className="article-page__related-articles-title">Читайте также:</h2>

                    <div className="grid article-page__related-articles-list">
                        <SingleLineTitleArticle />
                        <SingleLineTitleArticle />
                        <SingleLineTitleArticle />
                    </div>
                </div>
            </section>
        </section>
    );
};