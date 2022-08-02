import React, { FC, useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Articles } from '../Articles/Articles';
import { ArticleItem } from '../ArticleItem/ArticleItem';
import { AdminPage } from '../Adminpage/AdminPage';
import { Page } from '../Page/Page';
import { AdminArticles } from '../AdminArticles/AdminArticles';
import { AdminArticlesItem } from '../AdminArticlesItem/AdminArticlesItem';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';
import { LoginContainer } from '../../features/auth/login/LoginContainer';

export const App: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Switch>
      <Route path="/login" exact>
        <Page>
          <LoginContainer />
        </Page>
      </Route>
      <PrivateRoute exact path="/admin/create">
        <AdminPage>
          <AdminArticlesItem />
        </AdminPage>
      </PrivateRoute>
      <PrivateRoute path="/admin" exact>
        <AdminPage>
          <AdminArticles />
        </AdminPage>
      </PrivateRoute>
      <PrivateRoute path="/admin/edit/:id">
        <AdminPage>
          <AdminArticlesItem />
        </AdminPage>
      </PrivateRoute>
      <Route path="/article/:id">
        <Page>
          <ArticleItem />
        </Page>
      </Route>
      <Route path="/:categoryId">
        <Page>
          <Articles />
        </Page>
      </Route>
      <Route path="/">
        <Page>
          <Articles />
        </Page>
      </Route>
    </Switch>
  );
};
