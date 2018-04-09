import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_URL } from '../../constants';

@Injectable()
export class DashboardService {
  constructor(
    private http: HttpClient
  ) { }

  getCategoryInfo(category: string): Observable<Object> {
    return this.http.get(`${SERVER_URL}/${category}`);
  }
}
