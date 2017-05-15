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
    trigger('fadeInOut', [
      transition('void => *', [
        style({
          transform: 'translateY(-10px)',
          opacity: 0.0
        }),
        animate('300ms ease-out')
      ]),
      transition('* => void', [
        animate('300ms ease-in', style({
          opacity: 0.0,
          transform: 'translateY(-10px)'
        }))
      ])
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
  errorMessage: string;

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
    this.getDataService.getUserByUsername(this.user.username)
        .then((res) => {
          if (!Object.keys(res).length)  {  // check for empty res -> no user with the same username exists
            this.getDataService.updateUser(this.user)
              .then( () => {
                this.isEditing = false;
                this.isSaving = false;
              });
            this.isSaving = true;
            this.errorMessage = null;
          } else {
            this.errorMessage = 'Foglalt felhasználónév. Válassz másikat!';
          }
        });
  }

  cancelClicked(): void {
    this.isEditing = false;
    this.errorMessage = null;
    this.user = Object.assign({}, this.userBackup);  // roll back changes
  }

  changePassword(): void {
    this.isChangingPw = !this.isChangingPw;
  }

  handlePasswordChanged(): void {
    this.isChangingPw = false;
  }

}
