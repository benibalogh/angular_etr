import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/delay';
import { User } from '../interfaces/user';
import { Course } from '../interfaces/course';
import { MyCourse } from '../interfaces/mycourse';

@Injectable()
export class GetDataService {

  private usersUrl = 'api/users';  // URL to web api
  private mycoursesUrl = 'api/mycourses';  // URL to web api
  private coursesUrl = 'api/courses';  // URL to web api

  constructor(private http: Http) { }

  public getUsers(): Promise<User[]> {
    return this.http.get(this.usersUrl)
               .toPromise()
               .then(res => res.json().data as User[])
               .catch(this.handleError);
  }

  public getMyCourses(): Promise<MyCourse[]> {
     return this.http.get(this.mycoursesUrl)
                .toPromise()
                .then(res => res.json().data as MyCourse[])
                .catch(this.handleError);
  }

  public getCourses(): Promise<Course[]> {
    return this.http.get(this.coursesUrl)
               .toPromise()
               .then(res => res.json().data as Course[])
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred with server request', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
