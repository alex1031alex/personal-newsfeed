import { RootState } from "../../app/store";
import { Article } from "../articleItem/types";

export const getCategoryNews =
  (category_id: number) =>
  (state: RootState): Article[] =>
    state.categoryArticles[category_id] || [];
