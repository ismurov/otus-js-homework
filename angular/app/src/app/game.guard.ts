import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { StorageService } from "./services/storage.service";

@Injectable({
  providedIn: "root"
})
export class GameGuard implements CanActivate, CanActivateChild {
  constructor(private storage: StorageService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (this.storage.getDict().length) {
      return of(true);
    } else {
      this.router.navigate(["/dict"]);
      return of(false);
    }
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(route, state);
  }
}
