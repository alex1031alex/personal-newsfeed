import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetchCategory } from "@app/api";
import { setCategoryArticles } from "./slice";

export const fetchCategoryArticles = createAsyncThunk("api/fetchCategoryArticles", (categoryId: number, thunk) => {
  apiFetchCategory(categoryId).then((news) => {
    return thunk.dispatch(setCategoryArticles({ id: categoryId, articles: news.items }));
  });
});
