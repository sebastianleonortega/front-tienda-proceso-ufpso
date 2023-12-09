import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = 'http://localhost:8082/app/';

  constructor(private http: HttpClient) { }

  public getAllUser():Observable<any>{
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token no disponible');
      return new Observable();
    }
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get(this.apiUrl+"users/all", { headers });
  }

  public updateUser(id: any, data: any):Observable<any>{
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token no disponible');
      return new Observable();
    }
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.put(this.apiUrl+"users/"+id,data, { headers });
  }

  public getUserById(id: any):Observable<any>{
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token no disponible');
      return new Observable();
    }
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get(this.apiUrl+"users/"+id, { headers });
  }

  public deleteUser(id: any):Observable<any>{
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token no disponible');
      return new Observable();
    }
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.delete(this.apiUrl+"users/"+id, { headers });
  }

  public getAllArticle():Observable<any>{
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token no disponible');
      return new Observable();
    }
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get(this.apiUrl+"article/all", { headers });
  }

}
