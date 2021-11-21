import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpParamsOptions,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, throwError } from "rxjs";
import { RedditApiResponse } from "../models";
import { SessionService } from "./session.service";

export interface QueryParams {
  count: string;
  limit: string;
  after?: string;
  before: string;
}

@Injectable({
  providedIn: "root",
})
export class RedditService {
  public feedUrl = "https://www.reddit.com/r/poland/top.json?t=all";

  constructor(
    private httpClient: HttpClient,
    private sessionService: SessionService
  ) {}

  public fetchData(page: string | null) {
    let paramsOptions = {
      count:
        this.sessionService.currentPage !== 1
          ? (
              this.sessionService.currentLimit * this.sessionService.currentPage
            ).toString()
          : "0",
      limit: this.sessionService.currentLimit.toString(), //reddit return 11 or 12 items for limit 10
    };

    let params = new HttpParams({ fromObject: paramsOptions });

    if (page === "nextPage") {
      params = params.append("after", this.sessionService.after);
    }

    if (
      page === "previousPage" &&
      this.sessionService.before &&
      this.sessionService.currentPage != 1
    ) {
      params = params.append("before", this.sessionService.before);
    }

    return this.httpClient
      .get<RedditApiResponse>(this.feedUrl, {
        params,
      })
      .pipe(
        catchError(this.handleError),
        map((response: RedditApiResponse) => response.data)
      );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(`Error when calling reddit: ${error}`));
  }
}
