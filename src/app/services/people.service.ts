import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Person } from '../models/person';
@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private urlEndPoint: string = 'http://localhost:8080/api/people';

  constructor(private http: HttpClient, private router: Router) { }

  getPeople(): Observable<any> {
    return this.http.get(this.urlEndPoint).pipe(
      map((response: any) => {
        (response.content as Person[]).map(person => {
          person.fullName = person.fullName.toUpperCase();
          return person;
        });
        return response;
      })
    );
  }
}
