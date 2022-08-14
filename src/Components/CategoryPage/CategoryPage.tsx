import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import './CategoryPage.css';
import { NewsAPI } from '../../types';
import { categoryIds, categoryTitles } from '../../utils';
import { PartnerArticle } from '../PartnerArticle/PartnerArticle';
import { SidebarArticleCard } from '@components/SidebarArticleCard/SidebarArticleCard';
import { Hero } from '../Hero/Hero';
import { ArticleCard } from '@components/ArticleCard/ArticleCard';
import { CategoryNames } from '../../types';

export const CategoryPage: FC = () => {
  const { category }: { category: CategoryNames } = useParams();
  const [articles, setArticles] = React.useState<NewsAPI>({
    items: [],
    categories: [],
    sources: [],
  });

  React.useEffect(() => {
    fetch('https://frontend.karpovcourses.net/api/v2/ru/news/' + categoryIds[category] || '')
      .then((response) => response.json())
      .then((response: NewsAPI) => {
        setArticles(response);
      });
  }, [category]);

  return (
    <section className="category-page">
      <Hero
        title={categoryTitles[category]}
        image="https://firebasestorage.googleapis.com/v0/b/karpov-news-e31c6.appspot.com/o/ms1.jpg?alt=media&token=6bd2e945-dc15-4cb2-83ff-7b4d7df14072"
        className="category-page__hero"
      />
      <div className="container grid">
        <section className="category-page__content">
          {articles.items.slice(3).map((item) => {
            const category = articles.categories.find(({ id }) => item.category_id === id);
            const source = articles.sources.find(({ id }) => item.source_id === id);

            return (
              <ArticleCard
                className="category-page__item"
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
                category={category?.name}
                source={source?.name}
              />
            );
          })}
        </section>
        <section className="category-page__sidebar">
          {articles.items.slice(0, 3).map((item) => {
            const source = articles.sources.find(({ id }) => item.source_id === id);
            return (
              <SidebarArticleCard
                className="category-page__sidebar-item"
                key={item.id}
                id={item.id}
                title={item.title}
                source={source?.name || ''}
                date={item.date}
                image={item.image}
              />
            );
          })}
        </section>
      </div>
      <div className="category-page__partner-article">
        <PartnerArticle />
      </div>
    </section>
  );
};
