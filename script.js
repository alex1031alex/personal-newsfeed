const categoryIds = {
  index: 0,
  sport: 2,
  technologies: 1,
  karpov: 6,
  fashion: 3,
}

const categoryNames = {
  index: 'Главная',
  sport: 'Спорт',
  technologies: 'Технологии',
  karpov: 'Karpov',
  fashion: 'Мода',
}

const Navigation = ({ pages = [], currentPage, className = '', onNavClick = () => {}, placement, ...restProps }) => {
  return (
    <nav {...restProps} className={`grid navigation navigation--${placement} ${className}`}>
      <a className="navigation__logo" onClick={onNavClick} data-href="index" href="/index.html">
        <img className="navigation__logo-image" src="./images/logo.svg" alt="Логотип"/>
      </a>
      <ul className="navigation__list">
        {pages.map((page) => {
          return (
            <li className="navigation__item" key={page}>
              <a className={`navigation__link ${page === currentPage ? 'navigation__link--active' : ''}`} onClick={onNavClick} data-href={page} href="#">{categoryNames[page]}</a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

const App = () => {
  const [page, setPage] = React.useState('index');
  const [data, setData] = React.useState({ items: [], categories: [], sources: [] });

  React.useEffect(() => {
    fetch(`http://frontend.karpovcourses.net/api/v2/ru/news/${categoryIds[page]}`)
      .then(response => response.json())
      .then(({ items, categories, sources }) => {
        setData({ items, categories, sources })
      })
  }, [page]);

  const onNavClick = (e) => {
    e.preventDefault();
    setPage(e.currentTarget.dataset.href);
  }

  return (
    <React.Fragment>
      <header className="header">
        <div className="container">
          <Navigation
            placement="header"
            pages={['index', 'fashion', 'technologies', 'sport', 'karpov']}
            onNavClick={onNavClick}
            currentPage={page}
          />
        </div>
      </header>

      <main>
        <section className="articles">
          <div className="container grid">
            <section className="articles__big-column">
              {data.items.slice(0, 3).map((item) => {
                return (
                  <article className="main-article" key={item.title}>
                    <div className="main-article__image-container">
                      <img className="article-img main-article__img" src={item.image} alt="Фото новости"/>
                    </div>
                    <div className="main-article__content">
                      <span className="article-category">{data.categories.find(({id}) => item.category_id === id).name}</span>
                      <h2 className="main-article__title">{item.title}</h2>
                      <p className="main-article__text">{item.description}</p>
                      <span
                        className="article-source main-article__caption">{data.sources.find(({id}) => item.source_id === id).name}</span>
                    </div>
                  </article>
                )
              })}
            </section>
            <section className="articles__small-column">
              {data.items.slice(3, 12).map((item) => {
                return (
                  <article className="small-article" key={item.title}>
                    <h2 className="small-article__title">{item.title}</h2>
                    <span
                      className="article-date">{data.sources.find(({id}) => item.source_id === id).name}</span>
                    <span className="article-source">{new Date(item.date).toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' })}</span>
                  </article>
                )
              })}
            </section>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <Navigation
            placement="footer"
            className="footer__navigation"
            pages={['index', 'fashion', 'technologies', 'sport', 'karpov']}
            onNavClick={onNavClick}
            currentPage={page}
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

ReactDOM.render(<App />, document.getElementById('root'));
