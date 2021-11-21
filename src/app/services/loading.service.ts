import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  private loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor() {}

  public isLoading$(): Observable<boolean> {
    return this.loading$;
  }

  public setLoadingStatus(loading: boolean) {
    this.loading$.next(loading);
  }
}
