import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8082/app/users/';


  constructor(private http: HttpClient) { }

  public registerUser(data: any):Observable<any>{
    return this.http.post(this.apiUrl+"register", data);
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl+"auth/login", data);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
