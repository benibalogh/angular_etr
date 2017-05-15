import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { User } from './../interfaces/user';
import { GetDataService } from './../getdata/get-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
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
export class ProfileComponent implements OnInit {

  user: User;
  userBackup: User;
  isEditing = false;
  isSaving = false;
  isChangingPw = false;
  animState: string;

  public genders = [
    { value: 'N', display: 'Nő' },
    { value: 'F', display: 'Férfi' }
  ];

  constructor(private router: Router, private getDataService: GetDataService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    this.getDataService.getUserById(parseInt(sessionStorage.getItem('userid'), 10))
      .then( user => this.user = user);
  }

  editClicked(): void {
    this.isEditing = true;
    this.userBackup = Object.assign({}, this.user);
  }

  saveClicked(): void {
    // save to db
    this.getDataService.updateUser(this.user)
      .then( () => {
        this.isEditing = false;
        this.isSaving = false;
      });
    this.isSaving = true;
  }

  cancelClicked(): void {
    this.isEditing = false;
    this.user = Object.assign({}, this.userBackup);  // roll back changes
  }

  changePassword(): void {
    this.isChangingPw = !this.isChangingPw;
    this.animState = 'start';
    setTimeout(() => {
      this.animState = 'end';
    }, 100);
  }

  handlePasswordChanged(): void {
    this.isChangingPw = false;
  }

}
