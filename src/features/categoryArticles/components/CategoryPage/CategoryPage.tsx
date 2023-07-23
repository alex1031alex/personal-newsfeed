import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./CategoryPage.css";
import { CategoryNames } from "../../../categories/types";
import { categoryIds, categoryTitles } from "../../../categories/constants";
import { SidebarArticleCard } from "@components/SidebarArticleCard/SidebarArticleCard";
import { Hero } from "@components/Hero/Hero";
import { ArticleCard } from "@components/ArticleCard/ArticleCard";
import { ArticleCardSkeleton } from "@components/ArticleCard/ArticleCardSkeleton";
import { Dispatch } from "@app/store";
import { fetchCategoryArticles } from "../../actions";
import { getCategoryNews } from "../../selectors";
import { getCategories } from "../../../categories/selectors";
import { getSources } from "../../../sources/selectors";
import { HeroSkeleton } from "@components/Hero/HeroSkeleton";
import { SidebarArticleCardSkeleton } from "@components/SidebarArticleCard/SidebarArticleCardSkeleton";
import { repeat } from "@app/utils";
import { useAdaptive } from "@app/hooks";

export const CategoryPage: FC = () => {
  const { category }: { category: CategoryNames } = useParams();
  const dispatch = useDispatch<Dispatch>();
  const articles = useSelector(getCategoryNews(categoryIds[category]));
  const categories = useSelector(getCategories);
  const sources = useSelector(getSources);
  const [loading, setLoading] = useState(true);
  const { isMobile, isDesktop } = useAdaptive();

  React.useEffect(() => {
    setLoading(true);
    dispatch(fetchCategoryArticles(categoryIds[category])).then(() => {
      setLoading(false);
    });
  }, [category]);

  if (loading) {
    return (
      <section className="category-page">
        <HeroSkeleton title={categoryTitles[category]} className="category-page__hero" hasImage={true} />
        <div className="container grid">
          <section className="category-page__content">
            {repeat((i) => {
              return <ArticleCardSkeleton className="category-page__item" key={i} />;
            }, 6)}
          </section>

          {isDesktop && (
            <section className="category-page__sidebar">
              {repeat((i) => {
                return <SidebarArticleCardSkeleton className="category-page__sidebar-item" key={i} />;
              }, 3)}
            </section>
          )}
        </div>
      </section>
    );
  }

  const mainArticles = isMobile ? articles : articles.slice(3);

  return (
    <section className="category-page">
      <Hero
        title={categoryTitles[category]}
        image={require(`@images/categories/${category}.jpg`)}
        className="category-page__hero"
      />
      <div className="container grid">
        <section className="category-page__content">
          {mainArticles.map((item) => {
            const category = categories.find(({ id }) => item.category_id === id);
            const source = sources.find(({ id }) => item.source_id === id);

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
        {isDesktop && (
          <section className="category-page__sidebar">
            {articles.slice(0, 3).map((item) => {
              const source = sources.find(({ id }) => item.source_id === id);
              return (
                <SidebarArticleCard
                  className="category-page__sidebar-item"
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  source={source?.name || ""}
                  date={item.date}
                  image={item.image}
                />
              );
            })}
          </section>
        )}
      </div>
    </section>
  );
};
