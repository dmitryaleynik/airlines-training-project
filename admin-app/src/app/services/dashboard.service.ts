import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_URL } from '../../constants';

import { NewFlight } from '../classes/NewFlight';

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient) {}

  getPlanesShort(): Observable<Object> {
    return this.http.get(`${SERVER_URL}/planes/short`);
  }

  getPlaneById(planeId: number): Observable<Object> {
    return this.http.get(`${SERVER_URL}/planes/${planeId}`);
  }

  addFlight(flight: NewFlight): Observable<Object> {
    return this.http.post(`${SERVER_URL}/flights/add`, flight, {responseType: 'text'});
  }

  getCategoryInfo(category: string): Observable<Object> {
    return this.http.get(`${SERVER_URL}/${category}`);
  }
}
