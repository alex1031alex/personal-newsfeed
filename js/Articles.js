import React from 'react';
import { MainArticle } from './MainArticle.js';
import { SmallArticle } from './SmallArticle.js';

export const Articles = ({ data }) => {
  return (
    <section className="articles">
      <div className="container grid">
        <section className="articles__big-column">
          {data.items.slice(0, 3).map(({ title, image, description, category_id, source_id }) => {
            return (
              <MainArticle
                key={title}
                title={title}
                image={image}
                description={description}
                category={data.categories.find(({id}) => category_id === id).name}
                source={data.sources.find(({id}) => source_id === id).name}
              />
            )
          })}
        </section>
        <section className="articles__small-column">
          {data.items.slice(3, 12).map(({ title, date, source_id  }) => {
            return (
              <SmallArticle
                key={title}
                title={title}
                date={date}
                source={data.sources.find(({id}) => source_id === id).name}
              />
            )
          })}
        </section>
      </div>
    </section>
  )
}
