import { createReducer, on } from "@ngrx/store";
import { Post } from "src/app/models";
import { RedditActions } from "../actions/reddit.actions";

export interface RedditState {
  isLoading: boolean;
  posts: Post[];
  currentPage: number;
  currentLimit: number;
  after: string;
  before: string
}

export const redditInitialState: RedditState = {
  isLoading: false,
  posts: [],
  currentPage: 1,
  currentLimit: 10,
  after: '',
  before: ''
};

export const redditReducer = createReducer<RedditState>(
  redditInitialState,
  on(RedditActions.SET_LIMIT, (state, { newLimit }) => ({
    ...state,
    currentLimit: newLimit,
    currentPage: 1
  })),
  on(RedditActions.GO_TO_NEXT_PAGE, (state) => ({
    ...state,
    posts: [],
    currentPage: state.currentPage + 1,
  })),
  on(RedditActions.GO_TO_PREVIOUS_PAGE, (state) => ({
    ...state,
    posts: [],
    currentPage: state.currentPage - 1,
  })),
  on(RedditActions.GET_POSTS, (state) => ({
    ...state,
    isLoading: true
  })),
  on(RedditActions.SAVE_POSTS, (state, { posts, after, before }) => ({
    ...state,
    posts,
    isLoading: false,
    after,
    before
  }))
);
