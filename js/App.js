import React from 'react';
import { Navigation } from './Navigation.js';
import { Articles } from './Articles.js';
import { categoryIds } from './utils.js';

export const App = () => {
  const [category, setCategory] = React.useState('index');
  const [data, setData] = React.useState({ items: [], categories: [], sources: [] });

  React.useEffect(() => {
    fetch(`http://frontend.karpovcourses.net/api/v2/ru/news/${categoryIds[category]}`)
      .then(response => response.json())
      .then(({ items, categories, sources }) => {
        setData({ items, categories, sources })
      })
  }, [category]);

  const onNavClick = (e) => {
    e.preventDefault();
    setCategory(e.currentTarget.dataset.href);
  }

  return (
    <React.Fragment>
      <header className="header">
        <div className="container">
          <Navigation
            placement="header"
            categories={['index', 'fashion', 'technologies', 'sport', 'karpov']}
            onNavClick={onNavClick}
            currentCategory={category}
          />
        </div>
      </header>

      <main>
        <Articles data={data}/>
      </main>

      <footer className="footer">
        <div className="container">
          <Navigation
            placement="footer"
            className="footer__navigation"
            categories={['index', 'fashion', 'technologies', 'sport', 'karpov']}
            onNavClick={onNavClick}
            currentCategory={category}
          />
          <div className="footer__bottom">
            <p className="footer__text">
              Сделано на Frontend курсе в <a className="footer__link" href="https://karpov.courses/frontend" target="_blank">Karpov.Courses</a>
            </p>
            <p className="footer__text footer__text--gray">© 2021</p>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
}
