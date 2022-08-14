import React, { FC } from 'react';
import { ArticleCard } from '@components/ArticleCard/ArticleCard';
import './HomePage.css';
import { NewsAPI, Category, Source } from '../../types';
import { SidebarArticleCard } from '@components/SidebarArticleCard/SidebarArticleCard';
import { Hero } from '../Hero/Hero';
import { Link } from 'react-router-dom';
import { categoryIds } from '../../utils';
import { Title } from '../Title/Title';

type CategoriesRecord = Record<Category['id'], Category>;
type SourcesRecord = Record<Source['id'], Source>;

export const HomePage: FC = () => {
  const [articles, setArticles] = React.useState<NewsAPI['items']>([]);
  const [karpovArticles, setKarpovArticles] = React.useState<NewsAPI['items']>([]);
  const [trendArticles, setTrendArticles] = React.useState<NewsAPI['items']>([]);
  const [categories, setCategories] = React.useState<CategoriesRecord>({});
  const [sources, setSources] = React.useState<SourcesRecord>([]);

  React.useEffect(() => {
    Promise.all<NewsAPI>([
      fetch(`https://frontend.karpovcourses.net/api/v2/ru/news`).then((res) => res.json()),
      fetch(`https://frontend.karpovcourses.net/api/v2/ru/news/${categoryIds['karpov.courses']}`).then((res) =>
        res.json()
      ),
      fetch(`https://frontend.karpovcourses.net/api/v2/ru/trends`).then((res) => res.json()),
    ]).then(([articles, karpovArticles, trendArticles]) => {
      setArticles(articles.items);
      setKarpovArticles(karpovArticles.items);
      setTrendArticles(trendArticles.items);

      setCategories(
        [articles.categories, karpovArticles.categories, trendArticles.categories]
          .flat()
          .reduce((acc: CategoriesRecord, categoryItem) => {
            acc[categoryItem.id] = categoryItem;
            return acc;
          }, {})
      );

      setSources(
        [articles.sources, karpovArticles.sources, trendArticles.sources]
          .flat()
          .reduce((acc: SourcesRecord, sourceItem) => {
            acc[sourceItem.id] = sourceItem;
            return acc;
          }, {})
      );
    });
  }, []);

  const firstArticle = articles[0];

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
            {karpovArticles.slice(3, 6).map(({ id, title, description, date, source_id, image }) => {
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
      <div className="home-page__promo" />
      <section className="container grid home-page__section">
        <section className="home-page__content">
          {articles.slice(4).map(({ id, title, date, source_id, image, description }) => {
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
      </section>
    </div>
  );
};
