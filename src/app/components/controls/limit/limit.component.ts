import { Component, EventEmitter, Output } from "@angular/core";
import { SessionService } from "src/app/services/session.service";

@Component({
  selector: "app-limit",
  templateUrl: "limit.component.html",
  styles: [],
})
export class LimitComponent {
  @Output()
  public limitChange = new EventEmitter();

  public currentLimit: number;

  constructor(private readonly sesionService: SessionService) {
    this.currentLimit = sesionService.currentLimit;
  }

  public onLimitChange(newLimit: number): void {
    this.currentLimit = newLimit;
    this.sesionService.currentLimit = this.currentLimit;
    this.sesionService.currentPage = 1;
    this.limitChange.emit();
  }
}
