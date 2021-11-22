import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, throwError } from "rxjs";
import { RedditApiResponse } from "../models";

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

  constructor(private httpClient: HttpClient) {}

  public fetchData(
    limit: number,
    page: number,
    after: string | null,
    before: string | null
  ) {
    let paramsOptions = {
      count: page !== 1 ? (limit * page).toString() : "0",
      limit: limit.toString(), //reddit return 11 or 12 items for limit 10
    };

    let params = new HttpParams({ fromObject: paramsOptions });

    if (after) {
      params = params.append("after", after);
    }

    if (before) {
      params = params.append("before", before);
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
