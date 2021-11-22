import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { AppState, currentLimit } from "src/app/store/selectors/reddit.selectors";

@Component({
  selector: "app-limit",
  templateUrl: "limit.component.html",
  styles: [],
})
export class LimitComponent implements OnInit {
  @Output()
  public limitChange = new EventEmitter<number>();

  public currentLimit$: Observable<number>;

  constructor(private readonly store: Store<AppState>) {
    this.currentLimit$ = of(10);
  }

  ngOnInit() {
    this.currentLimit$ = this.store.select(currentLimit);
  }

  public onLimitChange(newLimit: number): void {
    this.limitChange.emit(newLimit);
  }
}
