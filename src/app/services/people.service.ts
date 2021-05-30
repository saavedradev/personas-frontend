import { DatePipe, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Person } from '../models/person';


@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private urlEndPoint: string = 'http://localhost:8080/api/people';

  constructor(private http: HttpClient, private router: Router) { }

  getPeople(): Observable<any> {
    return this.http.get(this.urlEndPoint).pipe(
      tap((response: any) => {
        console.log('ClienteService: tap 1');
        (response as Person[]).forEach(person => console.log(person.fullName));
      }),
      map((response: any) => {
        (response as Person[]).map(person => {
          person.fullName = person.fullName.toUpperCase();
          //let datePipe = new DatePipe('es');
          //person.birth = datePipe.transform(person.birth, 'EEEE dd, MMMM yyyy');
          //person.birth = formatDate(person.birth, 'dd-MM-yyyy', 'es');
          return person;
        });
        return response;
      }),
      tap(response => {
        console.log('ClienteService: tap 2');
        (response as Person[]).forEach(person => console.log(person.fullName));
      })
    );
  }

  create(person: Person): Observable<Person> {
    return this.http.post(this.urlEndPoint, person)
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
    return this.http.get<Person>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        return throwError(e);
      })
    );
  }
}
