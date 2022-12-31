import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseGuard implements CanActivate {
  CookieService: any;
  user: any;
  constructor(private authService: AuthService, private router: Router) {}
 /* canActivate(
    next: ActivatedRouteSnapshot,
   state: RouterStateSnapshot):boolean|UrlTree{
      let url: string = state.url;

          return this.checkLogin(url);
      }
      checkLogin(url: string):true|UrlTree {
        console.log("Url: " + url)
        let val: string | null = localStorage.getItem('isUserLoggedIn');

        if(val != null && val == "true"){
           if(url == "/login")
          return  this.router.parseUrl('/expenses')!;
           else
           return true;
              
        } else {
            return this.router.parseUrl('/login')!;
          
        }
     }
*/
canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
):
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree {
  return this.authService.isLoggedIn$.pipe(
    tap((isLoggedIn: any) => {
      if (!isLoggedIn) {
        this.router.navigate(['login']);
      }
    })
  );
}
}
