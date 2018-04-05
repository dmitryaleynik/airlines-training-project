import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { AUTH_TOKEN } from '../../constants';

import { SignInRequest } from '../classes/sign-in.request';
import { SignInResponse } from '../classes/sign-in.response';

@Injectable()
export class AuthorizationService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem(AUTH_TOKEN);
    return !this.jwtHelper.isTokenExpired(token);
  }

  setAuthToken(token: string): void {
    localStorage.setItem(AUTH_TOKEN, token);
    return;
  }

  signIn(user: SignInRequest): Observable<Object> {
    return this.http.post('http://localhost:3001/admin/sign-in', user).pipe(
      tap((res: SignInResponse) => this.setAuthToken(res.token)),
      catchError(error => {
        alert(error.message);
        return of(null);
      }),
    );
  }
}
