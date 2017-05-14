import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
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

export class TeachersComponent implements OnInit {
  animState: string = 'start';
  teachers: string[] = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.teachers = [ 'Pofá Zoltán', 'Kelep Elek', 'Égető Napsugár', 'Cserepes Virág' ];

    setTimeout(() => {
      this.animState = 'end';
    }, 400);
  }

}
