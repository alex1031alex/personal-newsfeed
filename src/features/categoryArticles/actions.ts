import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetchCategory } from "../../app/api";
import { setCategoryArticles } from "./slice";

export const fetchCategoryArticles = createAsyncThunk("api/fetchCategoryArticles", (catgoryId: number, thunk) => {
  apiFetchCategory(catgoryId).then((news) => {
    thunk.dispatch(setCategoryArticles({ id: catgoryId, articles: news.items }));
  });
});
