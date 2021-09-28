import React from "react";
import './SingleLineTitleArticle.css';

export const SingleLineTitleArticle = () => {
    return (
        <article className="single-line-title-article">
            <img className="single-line-title-article__image" src="http://placeimg.com/500/700/any" />
            <span className="article-category single-line-title-article__category">Мода</span>
            <h2 className="single-line-title-article__title">Заголовок в одну строчку здесь Заголовок в одну строчку здесь</h2>
            <p className="single-line-title-article__text">А вот текст этой новости, в котором что-то интересное поясняется и есть хитрая фраза, заставляющая открыть</p>
            <span className="article-source single-line-title-article__source">Источник</span>
        </article>
    );
};