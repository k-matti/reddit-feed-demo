import { Component, EventEmitter, Output } from "@angular/core";
import { SessionService } from "src/app/services/session.service";

@Component({
  selector: "app-pagination",
  templateUrl: "pagination.component.html",
  styleUrls: ["pagination.component.scss"],
})
export class PaginationComponent {
  @Output()
  public nextPage = new EventEmitter();

  @Output()
  public previousPage = new EventEmitter();

  public currentPage: number;

  constructor(private sesionService: SessionService) {
    this.currentPage = this.sesionService.currentPage;
  }

  public onNextPage() {
    this.currentPage = this.currentPage + 1;
    this.sesionService.currentPage = this.currentPage;
    this.nextPage.emit();
  }

  public onPreviousPage() {
    this.currentPage = this.currentPage - 1;
    this.sesionService.currentPage = this.currentPage;
    this.previousPage.emit(this.currentPage);
  }
}
