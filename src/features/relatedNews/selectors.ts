import { RootState } from "../../app/store";
import { Article } from "../articleItem/types";

export const getRelatedArticles =
  (articleId: number) =>
  (state: RootState): Article[] => {
    return state.relatedArticles[articleId] || [];
  };
