import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  AppState,
  currentPage,
} from "src/app/store/selectors/reddit.selectors";

@Component({
  selector: "app-pagination",
  templateUrl: "pagination.component.html",
  styleUrls: ["pagination.component.scss"],
})
export class PaginationComponent implements OnInit {
  @Output()
  public nextPage = new EventEmitter();

  @Output()
  public previousPage = new EventEmitter();

  public currentPage: number = 1;

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.select(currentPage).subscribe((x) => (this.currentPage = x));
  }

  public onNextPage() {
    this.nextPage.emit();
  }

  public onPreviousPage() {
    this.previousPage.emit();
  }
}
