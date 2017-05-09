import { Component, OnInit } from '@angular/core';
import { GetDataService } from './../getdata/get-data.service';
import { Router } from '@angular/router';

import { User } from './../interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: User;
  errorMessage: string;
  loading = false;
  displayDatePlaceholder = true;

  public genders = [
    { value: 'N', display: 'Nő' },
    { value: 'F', display: 'Férfi' }
  ];

  constructor(private getDataService: GetDataService, private router: Router) { }

  ngOnInit() {
    this.user = {
      id: 0,
      name: '',
      email: '',
      birthdate: new Date(),
      gender: this.genders[1].display,
      username: '',
      password: '',
      isTutor: false,
      courseids: [],
      payments: []
    };
  }

  register(): void {
    this.loading = true;
    this.getDataService.registerUser(this.user)
      .then((res) => {
        if (res !== null) {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'Létező felhasználónév, válassz másikat!';
          this.loading = false;
          //console.log('Already registered!');
        }
        // this.getDataService.getUser()
      });
  }

  removeDatePlaceholder(): void {
    this.displayDatePlaceholder = false;
  }

}
