import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from '../models/person';
import { PeopleService } from '../services/people.service';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.css']
})
export class CreatePersonComponent implements OnInit {
  person: Person = new Person();
  titulo: string = "Crear persona";

  errores: string[];

  constructor(private peopleService: PeopleService, private router: Router) { }

  ngOnInit(): void {
  }

  create(): void {
    console.log(this.person);
    this.peopleService.create(this.person)
      .subscribe(
        person => {
          this.router.navigate(['/people']);
          console.log( 'Nueva persona', `La persona ${person.fullName} ha sido creada con éxito`)
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
  }
}
