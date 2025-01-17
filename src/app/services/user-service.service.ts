import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  serviceUrl : string;

  constructor(private http: HttpClient) { 
    this.serviceUrl = "http://147.93.58.141:8083/users/";
  }

  addUser(user: User){
    return this.http.post(this.serviceUrl + 'add', user);
  }

  login(user: User):Observable<User>{
    return this.http.post<User>(this.serviceUrl + 'login', user);
  }
}
