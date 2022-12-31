import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServerService {
  baseUrl:String="http://localhost:8085/auth-server/signin"
   headerInfo = new HttpHeaders({
   
     'Access-Control-Allow-Origin': '*'
   });
  constructor(private http: HttpClient) { }
  login(username: string, password: string) {
    return this.http.post("http://localhost:8085/auth-server/signin", { username, password});
  }

}
