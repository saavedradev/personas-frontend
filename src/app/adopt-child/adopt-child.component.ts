import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor( private peopleService: PeopleService, private router: Router, private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      if (id) {
        console.log("ide*** "+id)
      }
    });
  }

  search(){
    console.log("ide*** "+this.identificationParent)
  }

}
