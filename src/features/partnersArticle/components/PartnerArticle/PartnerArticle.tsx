import React, { FC, useEffect, useState } from "react";
import "./PartnerArticle.css";
import { getMainPartnerArticle } from "../../../../app/api";
import { IPartnerArticle } from "../../types";

export const PartnerArticle: FC = () => {
  const [article, setArticle] = useState<IPartnerArticle | null>(null);

  useEffect(() => {
    (async () => {
      const mainPartnerArticle = await getMainPartnerArticle();
      setArticle(mainPartnerArticle);
    })();
  }, []);

  if (!article) {
    return null;
  }

  return (
    <section className="partner-article">
      <div className="container grid">
        <div className="partner-article__image-container">
          <img className="partner-article__image" src={article.image} alt={article.title} />
        </div>
        <div className="partner-article__content">
          <span className="partner-article__caption">Партнёрский материал от {article["company-name"]}</span>
          <h2 className="partner-article__title">{article.title}</h2>
          <p className="partner-article__text">{article.description}</p>
        </div>
      </div>
    </section>
  );
};
