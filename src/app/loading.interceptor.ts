import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { LoadingService } from "./services/loading.service";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingService.setLoadingStatus(true);
    return next
      .handle(request)
      .pipe(
        catchError((err) => {
          this.loadingService.setLoadingStatus(false);
          return err;
        })
      )
      .pipe(
        map<any, any>((evt: HttpEvent<any>) => {
          if (evt instanceof HttpResponse) {
            this.loadingService.setLoadingStatus(false);
          }
          return evt;
        })
      );
  }
}
