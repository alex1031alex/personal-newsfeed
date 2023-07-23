import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./HomePage.css";
import { categoryIds } from "../../../categories/constants";
import { ArticleCard } from "@components/ArticleCard/ArticleCard";
import { SidebarArticleCard } from "@components/SidebarArticleCard/SidebarArticleCard";
import { Hero } from "@components/Hero/Hero";
import { Title } from "@components/Title/Title";
import { PartnerArticle } from "../../../partnersArticle/components/PartnerArticle/PartnerArticle";
import { fetchNews, fetchTrends } from "../../actions";
import { Dispatch } from "@app/store";
import { getNews, getTrends } from "../../selectors";
import { fetchCategoryArticles } from "../../../categoryArticles/actions";
import { getCategoryNews } from "../../../categoryArticles/selectors";
import { getCategories } from "../../../categories/selectors";
import { getSources } from "../../../sources/selectors";
import { HeroSkeleton } from "@components/Hero/HeroSkeleton";
import { ArticleCardSkeleton } from "@components/ArticleCard/ArticleCardSkeleton";
import { SidebarArticleCardSkeleton } from "@components/SidebarArticleCard/SidebarArticleCardSkeleton";
import { repeat } from "@app/utils";
import { useAdaptive } from "@app/hooks";

export const HomePage: FC = () => {
  const dispatch = useDispatch<Dispatch>();
  const articles = useSelector(getNews);
  const trendArticles = useSelector(getTrends);
  const karpovArticles = useSelector(getCategoryNews(categoryIds["karpov.courses"]));
  const categories = useSelector(getCategories);
  const sources = useSelector(getSources);
  const [loading, setLoading] = useState(true);
  const { isDesktop, isMobile } = useAdaptive();

  React.useEffect(() => {
    setLoading(true);
    Promise.all([
      dispatch(fetchNews()),
      dispatch(fetchTrends()),
      dispatch(fetchCategoryArticles(categoryIds["karpov.courses"])),
    ]).then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="home-page">
        <div className="home-page__hero-link">
          <HeroSkeleton className="home-page__hero" hasText={true} />
        </div>
        <section className="container home-page__section">
          <Title Component="h2" className="home-page__title">
            В тренде
          </Title>
          <div className="grid">
            {repeat((i) => {
              return (
                <ArticleCardSkeleton
                  className="home-page__trends-item"
                  hasImage={false}
                  hasDescription={false}
                  key={i}
                />
              );
            }, 6)}
          </div>
        </section>

        <section className="container home-page__section">
          <Title Component="h2" className="home-page__title">
            Karpov
          </Title>
          <div className="grid">
            <section className="home-page__content">
              {repeat((i) => {
                return <ArticleCardSkeleton className="home-page__article-card" key={i} />;
              }, 4)}
            </section>
            <section className="home-page__sidebar">
              {repeat((i) => {
                return <SidebarArticleCardSkeleton className="home-page__sidebar-item" key={i} />;
              }, 2)}
            </section>
          </div>
        </section>
      </div>
    );
  }

  const firstArticle = articles[0];
  const mainArticles = isMobile ? articles.slice(1) : articles.slice(4);

  return (
    <div className="home-page">
      {firstArticle && (
        <Link className="home-page__hero-link" to={`/article/${firstArticle.id}`}>
          <Hero
            className="home-page__hero"
            image={firstArticle.image}
            title={firstArticle.title}
            text={firstArticle.description}
          />
        </Link>
      )}
      <section className="container home-page__section">
        <Title Component="h2" className="home-page__title">
          В тренде
        </Title>
        <div className="grid">
          {trendArticles.map(({ id, title, category_id, date }) => {
            const category = categories[category_id];
            return (
              <ArticleCard
                id={id}
                title={title}
                key={id}
                date={date}
                category={category?.name}
                className="home-page__trends-item"
              />
            );
          })}
        </div>
      </section>
      <section className="container home-page__section">
        <Title Component="h2" className="home-page__title">
          Karpov
        </Title>
        <div className="grid">
          <section className="home-page__content">
            {karpovArticles.slice(2, 6).map(({ id, title, description, date, source_id, image }) => {
              return (
                <ArticleCard
                  id={id}
                  title={title}
                  key={id}
                  date={date}
                  description={description}
                  className="home-page__article-card"
                  source={sources[source_id]?.name}
                  image={image}
                />
              );
            })}
          </section>
          <section className="home-page__sidebar">
            {karpovArticles.slice(0, 2).map(({ id, title, date, source_id, image }) => {
              return (
                <SidebarArticleCard
                  id={id}
                  title={title}
                  key={id}
                  date={date}
                  className="home-page__sidebar-item"
                  source={sources[source_id]?.name}
                  image={image}
                />
              );
            })}
          </section>
        </div>
      </section>
      <div className="home-page__promo">
        <PartnerArticle />
      </div>
      <section className="container grid home-page__section">
        <section className="home-page__content">
          {mainArticles.map(({ id, title, date, source_id, image, description }) => {
            return (
              <ArticleCard
                id={id}
                title={title}
                key={id}
                date={date}
                className="home-page__article-card"
                source={sources[source_id]?.name}
                description={description}
                image={image}
              />
            );
          })}
        </section>
        {isDesktop && (
          <section className="home-page__sidebar">
            {articles.slice(1, 4).map(({ id, title, date, source_id, image }) => {
              return (
                <SidebarArticleCard
                  id={id}
                  title={title}
                  key={id}
                  date={date}
                  className="home-page__sidebar-item"
                  source={sources[source_id]?.name}
                  image={image}
                />
              );
            })}
          </section>
        )}
      </section>
    </div>
  );
};
