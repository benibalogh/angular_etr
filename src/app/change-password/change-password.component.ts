import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DataService } from '../data/data.service';
import { User } from './../interfaces/user';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  @Input() user: User;
  @Output() finishedSaving = new EventEmitter();

  isSaving = false;
  pw1: string;
  pw2: string;
  errorMessage: string;

  constructor(private dataService: DataService) { }

  ngOnInit() { }

  savePassword(): void {
    if (this.pw1 === undefined || this.pw2 === undefined) {
      this.errorMessage = 'Ne hagyd ürsen az új jelszó mezőket!';
    } else if (this.pw1.trim() === '' || this.pw2.trim() === '' ) {
      this.errorMessage = 'A jelszó nem lehet whitespace karakter!';
    } else if (this.pw1 !== this.pw2) {
      this.errorMessage = 'A két jelszó nem egyezik meg!';
    } else {
      this.user.password = this.pw1;
      this.errorMessage = null;
      this.dataService.updateUser(this.user)
        .then( () => {
          this.isSaving = false;
          this.finishedSaving.emit();
        });
      this.isSaving = true;
    }
  }

}
