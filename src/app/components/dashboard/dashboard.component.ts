import { Component, OnDestroy } from "@angular/core";
import { Observable, of, Subject, takeUntil } from "rxjs";
import { FeedData, Post } from "src/app/models";
import { LoadingService } from "src/app/services/loading.service";
import { RedditService } from "src/app/services/reddit.service";
import { SessionService } from "src/app/services/session.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ["dashboard.component.scss"],
})
export class DashboardComponent implements OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  public posts: Post[];

  public after: string;
  public before: string | null;
  public isLoading$: Observable<boolean>;

  constructor(
    private redditService: RedditService,
    private sessionService: SessionService,
    private loadingService: LoadingService
  ) {
    this.posts = this.sessionService.posts;
    this.after = this.sessionService.after;
    this.before = this.sessionService.before;
    this.isLoading$ = of(false);
  }

  public ngOnInit(): void {
    this.getFeedData(null);
    this.isLoading$ = this.loadingService.isLoading$();
  }

  public onLimitChange() {
    this.getFeedData(null);
  }

  public onPreviousPage() {
    this.getFeedData("previousPage");
  }

  public onNextPage() {
    this.getFeedData("nextPage");
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getFeedData(page: string | null): void {
    this.redditService
      .fetchData(page)
      .pipe(takeUntil(this.destroy$))
      .subscribe((feedData: FeedData) => {
        this.sessionService.before = feedData.before ?? null;
        this.sessionService.after = feedData.after;
        this.sessionService.posts = feedData.children;
        this.posts = this.sessionService.posts;
      });
  }
}
