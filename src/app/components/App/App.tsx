import React, { FC, useEffect, useRef } from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import { Page } from "@components/Page/Page";
import { HomePage } from "@features/articlesList/components/HomePage/HomePage";
import { CategoryPage } from "@features/categoryArticles/components/CategoryPage/CategoryPage";
import { ArticlePage } from "@features/articleItem/components/ArticlePage/ArticlePage";
import { AdminPage } from "@features/admin/components/AdminPage/AdminPage";
import { AdminArticles } from "@features/admin/components/AdminArticles/AdminArticles";
import { AdminArticlesItem } from "@features/admin/components/AdminArticleItem/AdminArticlesItem";
import { PrivateRoute } from "@features/auth/components/PrivateRoute/PrivateRoute";
import { LoginContainer } from "@features/auth/login/LoginContainer";

export const App: FC = () => {
  const { pathname } = useLocation();
  const prevPathName = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPathName.current) {
      prevPathName.current = pathname;
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <Switch>
      <Route path="/login">
        <Page>
          <LoginContainer />
        </Page>
      </Route>
      <PrivateRoute path="/admin" exact>
        <AdminPage>
          <AdminArticlesItem />
        </AdminPage>
      </PrivateRoute>
      <PrivateRoute path="/admin/create">
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
          <ArticlePage />
        </Page>
      </Route>
      <Route path="/:category">
        <Page>
          <CategoryPage />
        </Page>
      </Route>
      <Route path="/">
        <Page>
          <HomePage />
        </Page>
      </Route>
    </Switch>
  );
};
