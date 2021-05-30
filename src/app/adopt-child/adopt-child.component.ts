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
  constructor( private peopleService: PeopleService, private router: Router, private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.person = null;
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      if (id) {
        console.log("ide*** "+id)
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

}
