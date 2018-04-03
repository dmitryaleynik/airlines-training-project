import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SignIn } from './sign-in';

@Injectable()
export class AuthorizationService {

  constructor(private http: HttpClient) { }

  signIn(user: SignIn): Observable<any> {
    return this.http.post('http://localhost:3001/sign-in', user);
  }
}
