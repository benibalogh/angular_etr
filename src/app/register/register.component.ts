import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
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

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit() {
    // create a default user
    this.user = {
      id: 0,
      name: '',
      email: '',
      birthdate: new Date(),
      gender: this.genders[1].display,
      username: '',
      password: '',
      isTutor: false,
      payments: [],
      courseids: [],
      paymentids: [],
      paymentstatus: [],
      scholarshipids: [],
      exams: []
    };
  }

  register(): void {
    this.loading = true;
    this.dataService.registerUser(this.user)
      .then((res) => {
        if (res !== null) {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage = 'Létező felhasználónév, válassz másikat!';
          this.loading = false;
        }
      });
  }

  // after a click remove placeholder text of birthdate field
  removeDatePlaceholder(): void {
    this.displayDatePlaceholder = false;
  }

}
