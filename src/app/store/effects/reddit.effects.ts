import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { RedditActions } from "../actions/reddit.actions";
import { RedditService } from "src/app/services/reddit.service";
import { Store } from "@ngrx/store";
import { after, AppState, before, currentLimit, currentPage } from "../selectors/reddit.selectors";

@Injectable()
export class RedditEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly redditService: RedditService,
    private readonly store: Store<AppState>
  ) {}

  public getposts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        RedditActions.GET_POSTS,
        RedditActions.SET_LIMIT
      ),
      withLatestFrom(
        this.store.select(currentLimit),
        this.store.select(currentPage)
      ),
      switchMap(([_, currentLimit, currentPage]) =>
        this.redditService
          .fetchData(currentLimit, currentPage, null, null)
          .pipe(
            map((data) => {
              return RedditActions.SAVE_POSTS({
                posts: data.children,
                after: data.after,
                before: data.before,
              });
            })
          )
      )
    )
  );

  public getpostsFromNextPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RedditActions.GO_TO_NEXT_PAGE),
      withLatestFrom(
        this.store.select(currentLimit),
        this.store.select(currentPage),
        this.store.select(after)
      ),
      switchMap(([_, currentLimit, currentPage, after]) =>
        this.redditService
          .fetchData(currentLimit, currentPage, after, null)
          .pipe(
            map((data) => {
              return RedditActions.SAVE_POSTS({
                posts: data.children,
                after: data.after,
                before: data.before,
              });
            })
          )
      )
    )
  );

  public getpostsFromPreviousPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RedditActions.GO_TO_PREVIOUS_PAGE),
      withLatestFrom(
        this.store.select(currentLimit),
        this.store.select(currentPage),
        this.store.select(before)
      ),
      switchMap(([_, currentLimit, currentPage, before]) =>
        this.redditService
          .fetchData(currentLimit, currentPage, null, before)
          .pipe(
            map((data) => {
              return RedditActions.SAVE_POSTS({
                posts: data.children,
                after: data.after,
                before: data.before,
              });
            })
          )
      )
    )
  );
}
