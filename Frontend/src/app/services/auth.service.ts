import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { UserForLogin, UserForRegister } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  authUser(user: UserForLogin): Observable<UserForLogin> {
    return this.http.post<UserForLogin>(this.baseUrl + '/api/account/login', user);
  }

  registerUser(user: UserForRegister) {
    return this.http.post(this.baseUrl + '/api/account/register', user);
  }
}
