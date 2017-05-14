import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Classroom } from '../interfaces/classroom';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.css'],
})

export class ClassroomsComponent implements OnInit {
  classrooms: Classroom[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.classrooms.push({
      label: 'CX-501A',
      size: 50,
      address: 'Szeged, Feketesas utca 3.'
    });

    this.classrooms.push({
      label: 'CX-502B',
      size: 20,
      address: 'Szeged, Feketesas utca 3.'
    });

    this.classrooms.push({
      label: 'CX-504',
      size: 25,
      address: 'Szeged, Viktor Hugo utca 5.'
    });

    this.classrooms.push({
      label: 'CX-509',
      size: 10,
      address: 'Szeged, Zászló utca 10.'
    });
  }

  showOnMap(address: string) {
    let _address = 'https://www.google.hu/maps/place/' + address.split(' ').join('+');
    window.open(_address, '_blank');
  }

}
