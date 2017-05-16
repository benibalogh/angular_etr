import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  isLoggedIn = false;
  errorMessage: string;
  redirectUrl: string;

  private usersUrl = 'api/users';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
    const name = localStorage.getItem('name');
    if (name !== null) {
      this.isLoggedIn = true;
    }
  }

  login(username: string, password: string): Observable<boolean> {
    const url = `${this.usersUrl}?username=^${username}$`;
    return this.http.get(url)
      .map((res: Response) => {
        const data = res.json().data;
        if (!Object.keys(data).length) {
          this.errorMessage = 'Nincs ilyen felhasználónév!';
          return false;  // no such username
        } else if (data[0].password === password) {
          this.isLoggedIn = true;
          localStorage.setItem('userid', data[0].id.toString());
          localStorage.setItem('name', data[0].name);
          return true;  // username and password is correct
        } else {
          this.errorMessage = 'Nem jó a jelszó!';
          return false;  // password is incorrect
        }
      });
  }

  logout(): void {
    localStorage.clear();
    this.isLoggedIn = false;
    this.errorMessage = '';
  }

}
