import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/models";

export class RedditActions {
  public static readonly GET_POSTS = createAction("[REDDIT] Get posts");
  public static readonly SAVE_POSTS = createAction("[REDDIT] Save posts",
  props<{ posts: Post[], after: string, before: string}>());

  public static readonly GO_TO_NEXT_PAGE = createAction(
    "[REDDIT] Go to next page"
  );

  public static readonly GO_TO_PREVIOUS_PAGE = createAction(
    "[REDDIT] Go to previous page"
  );

  public static readonly SET_LIMIT = createAction(
    "[REDDIT] Set new limit",
    props<{ newLimit: number }>()
  );
}
