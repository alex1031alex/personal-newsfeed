import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./ArticlePage.css";
import { beautifyDate } from "@app/utils";
import { categoryTitles } from "../../../categories/constants";
import { SidebarArticleCard } from "@components/SidebarArticleCard/SidebarArticleCard";
import { Hero } from "@components/Hero/Hero";
import { ArticleCard } from "@components/ArticleCard/ArticleCard";
import { Title } from "@components/Title/Title";
import { Source } from "../../../sources/components/Source/Source";
import { getCachedArticleItem } from "../../selectors";
import { getRelatedArticles } from "../../../relatedNews/selectors";
import { getSources } from "../../../sources/selectors";
import { fetchArticleItem } from "../../actions";
import { fetchRelatedArticles } from "../../../relatedNews/actions";
import { HeroSkeleton } from "@components/Hero/HeroSkeleton";
import { SkeletonText } from "@components/SkeletonText/SkeletonText";
import { repeat } from "@app/utils";
import { SidebarArticleCardSkeleton } from "@components/SidebarArticleCard/SidebarArticleCardSkeleton";
import { useAdaptive } from "@app/hooks";

export const ArticlePage: FC = () => {
  const { id }: { id?: string } = useParams();
  const dispatch = useDispatch();
  const articleItem = useSelector(getCachedArticleItem(Number(id)));
  const relatedArticles = useSelector(getRelatedArticles(Number(id)));
  const sources = useSelector(getSources);
  const [loading, setLoading] = useState(!articleItem?.text);
  const { isDesktop } = useAdaptive();

  React.useLayoutEffect(() => {
    if (!articleItem?.text) {
      setLoading(true);
      Promise.all([dispatch(fetchArticleItem(Number(id))), dispatch(fetchRelatedArticles(Number(id)))]).then(() => {
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <section className="article-page">
        {articleItem?.title && articleItem?.image ? (
          <Hero title={articleItem.title} image={articleItem.image} className="article-page__hero" />
        ) : (
          <HeroSkeleton hasText={true} className="article-page__hero" />
        )}
        <div className="container article-page__main">
          <div className="article-page__info">
            <SkeletonText />
          </div>
          <div className="grid">
            <div className="article-page__content">
              <SkeletonText rowsCount={6} />
            </div>

            {isDesktop && (
              <div className="article-page__sidebar">
                {repeat((i) => {
                  return <SidebarArticleCardSkeleton key={i} className="article-page__sidebar-item" />;
                }, 3)}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (articleItem === null) {
    return null;
  }

  return (
    <section className="article-page">
      <Hero title={articleItem.title} image={articleItem.image} className="article-page__hero" />
      <div className="container article-page__main">
        <div className="article-page__info">
          <span className="article-page__category">{categoryTitles[articleItem.category.name]}</span>
          <span className="article-page__date">{beautifyDate(articleItem.date)}</span>
          {articleItem.link.length > 0 && (
            <Source className="article-page__source" href={articleItem.link}>
              {articleItem.source?.name}
            </Source>
          )}
        </div>
        <div className="grid">
          <div className="article-page__content">
            <p>{articleItem.text}</p>
          </div>

          {isDesktop && (
            <div className="article-page__sidebar">
              {relatedArticles.slice(3, 9).map((item) => {
                const source = sources.find(({ id }) => item.source_id === id);

                return (
                  <SidebarArticleCard
                    className="article-page__sidebar-item"
                    date={item.date}
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    source={source?.name || ""}
                    image={item.image}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>

      <section className="article-page__related-articles">
        <div className="container">
          <Title Component="h2" className="article-page__related-articles-title">
            Читайте также:
          </Title>
          <div className="grid article-page__related-articles-list">
            {relatedArticles.slice(0, 3).map((item) => {
              const source = sources.find(({ id }) => item.source_id === id);

              return (
                <ArticleCard
                  className="article-page__related-articles-item"
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  date={item.date}
                  source={source?.name}
                />
              );
            })}
          </div>
        </div>
      </section>
    </section>
  );
};
