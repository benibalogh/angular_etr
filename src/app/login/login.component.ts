import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { NgForm} from '@angular/forms';
import { Http } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GetDataService } from '../getdata/get-data.service';
import {User} from '../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    errorMessage: string;
    users: User[];
    loggedIn: Boolean;
    valid: Boolean;
    debug: Boolean;

    constructor(private http: Http, private getDataService: GetDataService, private router: Router) {
      this.getDataService.getUsers()
      .subscribe(
        users => this.users = users
      );
    }

  ngOnInit() {
    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('name');
  }

  login(form: NgForm) {
    this.valid = true;
    if (form.value.username === '' || form.value.password === '') {
      this.errorMessage = 'üres valamelyik mező';
      this.valid = false;
    }

    if (this.valid) {
      for (const u of this.users){
        if (form.value.username === u.username) {
          if (form.value.password === u.password) {
            sessionStorage.setItem('userid', u.userid.toString());
            sessionStorage.setItem('name', u.username);
            this.router.navigate(['/dashboard']);
          } else {
            this.errorMessage = 'Nem jó a jelszó';
            return;
          }
        }
      }
      this.errorMessage = 'Nincs ilyen felhasználónév';
      return;
    } else {
      return;
    }
  }
}
