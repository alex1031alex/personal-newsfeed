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

const Navigation = ({ categories = [], currentCategory, className = '', onNavClick = () => {}, placement, ...restProps }) => {
  return (
    <nav {...restProps} className={`grid navigation navigation--${placement} ${className}`}>
      <a className="navigation__logo" onClick={onNavClick} data-href="index" href="/index.html">
        <img className="navigation__logo-image" src="./images/logo.svg" alt="Логотип"/>
      </a>
      <ul className="navigation__list">
        {categories.map((page) => {
          return (
            <li className="navigation__item" key={page}>
              <a className={`navigation__link ${page === currentCategory ? 'navigation__link--active' : ''}`} onClick={onNavClick} data-href={page} href="#">{categoryNames[page]}</a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

const MainArticle = ({ title, image, description, category, source }) => {
  return (
    <article className="main-article">
      <div className="main-article__image-container">
        <img className="article-img main-article__img" src={image} alt="Фото новости"/>
      </div>
      <div className="main-article__content">
        <span className="article-category">{category}</span>
        <h2 className="main-article__title">{title}</h2>
        <p className="main-article__text">{description}</p>
        <span
          className="article-source main-article__caption">{source}</span>
      </div>
    </article>
  )
}

const SmallArticle = ({ title, date, source }) => {
  return (
    <article className="small-article">
      <h2 className="small-article__title">{title}</h2>
      <span
        className="article-date">{source}</span>
      <span className="article-source">{new Date(date).toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' })}</span>
    </article>
  )
}

const Articles = ({ data }) => {
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

const App = () => {
  const [category, setCategory] = React.useState('index');
  const [data, setData] = React.useState({ items: [], categories: [], sources: [] });

  React.useEffect(() => {
    fetch(`https://frontend.karpovcourses.net/api/v2/ru/news/${categoryIds[category]}`)
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

ReactDOM.render(<App />, document.getElementById('root'));
