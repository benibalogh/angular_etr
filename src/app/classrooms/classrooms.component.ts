import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Classroom } from '../interfaces/classroom';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.css'],
  animations: [
    trigger('fadeInState', [
      state('start', style({
        opacity: 0.0,
        transform: 'translateY(-10px)'
      })),
      state('end', style({
        opacity: 1.0,
        transform: 'translateY(0px)'
      })),
      transition('start => end', animate('500ms ease-out'))
    ])
  ]
})

export class ClassroomsComponent implements OnInit {
  animState: string = 'start';
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

    setTimeout(() => {
      this.animState = 'end';
    }, 400);
  }

  showOnMap(address: string) {
    let _address = 'https://www.google.hu/maps/place/' + address.split(' ').join('+');
    window.open(_address, '_blank');
  }

}
