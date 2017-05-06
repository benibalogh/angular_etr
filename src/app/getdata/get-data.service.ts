import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Course } from '../interfaces/course';
import { MyCourse } from '../interfaces/mycourse';

@Injectable()
export class GetDataService {

  constructor(private http: Http) { }

  public getUsers(): Observable<User[]> {
    return this.http.get('assets/data/database.json')
      .map(res => res.json().database.users);
  }

  public getMyCourses(): Observable<MyCourse[]> {
     return this.http.get('assets/data/database.json')
      .map(res => res.json().database.mycourses);
  }

  public getCourses(): Observable<Course[]> {
    return this.http.get('assets/data/database.json')
      .map(res => res.json().database.courses);
  }

}
