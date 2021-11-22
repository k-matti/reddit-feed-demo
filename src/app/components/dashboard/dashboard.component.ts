import { Component, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, of, Subject } from "rxjs";
import { Post } from "src/app/models";
import { LoadingService } from "src/app/services/loading.service";
import { RedditActions } from "src/app/store/actions/reddit.actions";
import { AppState, posts } from "src/app/store/selectors/reddit.selectors";

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ["dashboard.component.scss"],
})
export class DashboardComponent implements OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  public posts: Post[];
  public isLoading$: Observable<boolean>;

  constructor(private store: Store<AppState>, private loadingService: LoadingService) {
    this.posts = [];
    this.isLoading$ = of(false);
  }

  public ngOnInit(): void {
    this.isLoading$ = this.loadingService.isLoading$();
    this.store.dispatch(RedditActions.GET_POSTS());
    this.store.select(posts).subscribe((x) => (this.posts = x));
  }

  public onLimitChange(newLimit: number) {
    this.store.dispatch(RedditActions.SET_LIMIT({ newLimit }));
  }

  public onPreviousPage() {
    this.store.dispatch(RedditActions.GO_TO_PREVIOUS_PAGE());
  }

  public onNextPage() {
    this.store.dispatch(RedditActions.GO_TO_NEXT_PAGE());
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
