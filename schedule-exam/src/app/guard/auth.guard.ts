import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../Services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let expectedRole: string = route.data["expectedRole"];

    if(expectedRole) {
      this._router.navigate(['login']);
      return false;
    }
    return true;
  }

  //   if(this._authService.getUserRole() === expectedRole) {
  //     this._router.navigate(['login']);
  //     return false;
  //   }
  //   return true;
  // }

}
