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
  loading = false;

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
      gender: this.genders[1].value,
      username: '',
      password: ''
    };
  }

  register(): void {
    this.loading = true;
    this.getDataService.createUser(this.user)
      .then(() => {
        this.router.navigate(['/login']);
        // this.getDataService.getUser()
      });
  }

}
