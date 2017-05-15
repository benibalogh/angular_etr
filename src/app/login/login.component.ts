import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { NgForm} from '@angular/forms';
import { Http } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GetDataService } from '../getdata/get-data.service';
import { User } from '../interfaces/user';

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
    loading = false;

    constructor(private http: Http, private getDataService: GetDataService, private router: Router) { }

  ngOnInit() {
    if (sessionStorage.getItem('name') !== null) {
      this.router.navigate(['/dashboard']);
    }
  }

  login(form: NgForm) {
    this.valid = true;
    if (form.value.username === '' || form.value.password === '') {
      this.errorMessage = 'Üres valamelyik mező';
      this.valid = false;
      return;
    } else {
      this.loading = true;
      this.getDataService.getUsers()
      .then((users) => {
        this.users = users;
        for (const u of this.users) {
          if (form.value.username === u.username) {
            if (form.value.password === u.password) {
              sessionStorage.setItem('userid', u.id.toString());
              sessionStorage.setItem('name', u.name);
              this.router.navigate(['/dashboard/my-courses']);
            } else {
              this.errorMessage = 'Nem jó a jelszó';
              this.loading = false;
              return;
            }
          }
        }
        this.errorMessage = 'Nincs ilyen felhasználónév';
        this.loading = false;
        return;
      });
    }
  }
}
