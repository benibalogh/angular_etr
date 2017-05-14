import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { GetDataService } from './../getdata/get-data.service';
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

  constructor(private getDataService: GetDataService) { }

  ngOnInit() { }

  savePassword(): void {
    if (this.pw1 !== undefined && this.pw2 !== undefined && this.pw1 === this.pw2) {
      this.user.password = this.pw1.trim();
      this.errorMessage = null;
      this.getDataService.updateUser(this.user)
        .then( () => {
          this.isSaving = false;
          this.finishedSaving.emit();
        });
      this.isSaving = true;
    } else {
      this.errorMessage = 'A két jelszó nem egyezik meg!';
    }
  }

}
