import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AUTH_TOKEN } from '../constants';

import { SignInRequest } from './classes/sign-in.request';
import { SignInResponse } from './classes/sign-in.response';

@Injectable()
export class AuthorizationService {
  constructor(private http: HttpClient) {}

  setAuthToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN, token);
    return;
  }

  signIn(user: SignInRequest): Observable<Object> {
    return this.http.post('http://localhost:3001/sign-in', user);
  }
}
