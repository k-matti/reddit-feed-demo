import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RedditState } from "../reducers/reddit.reducer";

export const selectFeature = createFeatureSelector<AppState, RedditState>(
  "redditState"
);

export const isLoading = createSelector(
  selectFeature,
  (state) => state.isLoading
);
export const currentPage = createSelector(
  selectFeature,
  (state) => state.currentPage
);
export const currentLimit = createSelector(
  selectFeature,
  (state) => state.currentLimit
);
export const posts = createSelector(selectFeature, (state) => state.posts);
export const after = createSelector(selectFeature, (state) => state.after);
export const before = createSelector(selectFeature, (state) => state.before);

export interface AppState {
  redditState: RedditState;
}
