import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { Location } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private location: Location, public router: Router) { }

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.location.getState() != null) {
      return true;
    } else {
      this.router.navigate(["/dashboard"]);
      return false;
    }
  }
}
