import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of, tap } from 'rxjs';
import { UserClass } from '../models/user-class.model';
import { ApiServerService } from './api-server.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient,private apiService:ApiServerService) {  
    this._isLoggedIn$.next(!!this.token);
    this.user = this.getUser(this.token);}
 /* isUserLoggedIn: boolean = false;
  CookieService: any;
  user: any;
  router: any;
  body:any;
  login(userName: string, password: string) {
     console.log(userName);
     console.log(password);
     this.body={
      "username":userName,
      "password":password
     }
     this.isUserLoggedIn = userName == 'admin' && password == 'admin';
     //localStorage.setItem('isUserLoggedIn', this.isUserLoggedIn ? "true" : "false"); 
     //this.saveToken()
     this.CookieService.set('isUserLoggedIn', this.isUserLoggedIn?"true":"false");
     return this.http.post("http://localhost:8085/auth-server/signin" + 'stages', this.body,{ observe: 'response' });

  }
  saveToken(token:any, check:any) {
    const expireDate = new Date().getTime() + 1000 * token.expires_in;
    this.CookieService.set('access_token', token.access_token, expireDate);
   // this.CookieService.set('refresh_token', token.refresh_token);
    this.CookieService.set('authorities', check.authorities);
    this.CookieService.set('user', JSON.stringify(check.user[0]));
    this.CookieService.authorities = check.authorities;
    this.user = check.user[0];
    this.router.navigate(['/home']);
  }

  logout(): void {
  this.isUserLoggedIn = false;
     localStorage.removeItem('isUserLoggedIn'); 
  }

  */
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'profanis_auth';
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  user: UserClass | null;

  get token(): any {
     //localStorage.getItem(this.TOKEN_NAME);
     return JSON.parse(localStorage.getItem(this.TOKEN_NAME)!)
  }

  

  login(username: string, password: string) {
    return this.apiService.login(username, password).pipe(
      tap((response: any) => {
        this._isLoggedIn$.next(true);
        localStorage.setItem(this.TOKEN_NAME, response.token);
        this.user = this.getUser(response.token);
      })
    );
  }

  private getUser(token: string): UserClass | null {
    if (!token) {
      return null
    }
    return JSON.parse(atob(token.split('.')[1])) as UserClass;
  }
}
