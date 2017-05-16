import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { NgForm} from '@angular/forms';
import { Http } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../interfaces/user';
import { AuthService } from './../auth.service';

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

    constructor(private http: Http, private authService: AuthService, private router: Router) {
      authService.errorMessage = '';
    }

  ngOnInit() {
    // if (sessionStorage.getItem('name') !== null) {
    //   this.router.navigate(['/dashboard']);
    // }
  }

  login(form: NgForm) {
    this.valid = true;
    if (form.value.username === '' || form.value.password === '') {
      this.errorMessage = 'Üres valamelyik mező';
      this.valid = false;
      return;
    } else {
      this.loading = true;
      this.authService.login(form.value.username, form.value.password).subscribe(() => {
        this.errorMessage = this.authService.errorMessage;
        this.loading = false;
        if (this.authService.isLoggedIn) {
          // Get the redirect URL from our auth service
          // If no redirect has been set, use the default
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/dashboard/my-courses';
          // Redirect the user
          this.router.navigate([redirect]);
        }
      });
    }
  }

}
