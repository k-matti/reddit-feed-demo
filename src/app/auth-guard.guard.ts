import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { SessionService } from "./services/session.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private sessionService: SessionService, public router: Router) { }

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.sessionService.selectedPostData != null) {
      return true;
    } else {
      this.router.navigate(["/dashboard"]);
      return false;
    }
  }
}
