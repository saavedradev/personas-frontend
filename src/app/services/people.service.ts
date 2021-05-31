import { DatePipe, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Person } from '../models/person';


@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private urlEndPointPeople: string = `${environment.apiUrl}/api/people`;
  private urlEndPointAdopt: string =  `${environment.apiUrl}/api/adopt/`;

  constructor(private http: HttpClient) { }

  getPeople(): Observable<any> {
    return this.http.get(this.urlEndPointPeople).pipe(
      tap((response: any) => {
        (response as Person[]).forEach(person => console.log(person.fullName));
      }),
      map((response: any) => {
        (response as Person[]).map(person => {
          person.fullName = person.fullName.toUpperCase();
          return person;
        });
        return response;
      }),
      tap(response => {
        (response as Person[]).forEach(person => console.log(person.fullName));
      })
    );
  }

  create(person: Person): Observable<Person> {
    return this.http.post(this.urlEndPointPeople, person)
      .pipe(
        map((response: any) => response.persona),
        catchError(e => {

          if (e.status == 400) {
            return throwError(e);
          }

          console.error(e.error.mensaje);
          return throwError(e);
        })
      );
  }

  getPerson(id): Observable<Person> {
    return this.http.get<Person>(`${this.urlEndPointPeople}/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }

  adopt(person: Person, idChild: string): Observable<Person> {
    return this.http.put(`${this.urlEndPointAdopt}/${idChild}`, person)
      .pipe(
        map((response: any) => response),
        catchError(e => {
          if (e.status == 400) {
            return throwError(e);
          }
          console.error(e.error.mensaje);
          return throwError(e);
        })
      );
  }
}
