import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Person } from '../models/person';
import { PeopleService } from '../services/people.service';

@Component({
  selector: 'app-adopt-child',
  templateUrl: './adopt-child.component.html',
  styleUrls: ['./adopt-child.component.css']
})
export class AdoptChildComponent implements OnInit {
  titulo: string = "Adoptar Persona";
  errores: string[];
  identificationParent: string;
  person: Person = new Person();
  idChild: string = "";
  constructor( private peopleService: PeopleService, private router: Router, private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.person = null;
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      if (id) {
        this.idChild = id.toString();
      }
    });
  }

  search(){
    this.peopleService.getPerson(this.identificationParent).subscribe(
      (person) => {this.person= person},
      err => {
        this.person = null;
        this.errores = err.error.mensaje as string[];
        Swal.fire('Advertencia', err.error.mensaje, 'warning');
      }
      );
  }

  adopt(): void {
    this.peopleService.adopt(this.person, this.idChild)
      .subscribe(
        response => {
          this.router.navigate(['/people']);
          Swal.fire('Nueva persona', `La persona ${this.person.fullName} adoptó con éxito`);
        },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          Swal.fire('Error al adoptar', `La persona np pudo adoptar`, 'error');
          console.error(err.error.errors);
        }
      );
  }
}
