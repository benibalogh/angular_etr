import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {User} from '../interfaces/user';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'
import {Courses} from '../interfaces/courses';
import {MyCourses} from '../interfaces/mycourses';

@Injectable()
export class GetDataService {

  constructor(private http: Http) { }
  jsondata: Object;

  users: Object;
  user: User[];
  results: Observable<User[]>;

  mycourses: Object;
  mycourse: MyCourses[];
  results2: Observable<MyCourses[]>;

  courses: Object;
  course: Courses[];
  results3: Observable<Courses[]>;

  getDatas(): Observable<User[]>{
    this.results = this.http.get('assets/data/database.json')
      .map(res => res.json())
      .map(jsondata => this.jsondata = jsondata.database)
      .map(users => this.users = users.users)
      .map(user => this.user = user);
    return this.results;
  }

  getMyCourses(): Observable<MyCourses[]>{
    this.results2 = this.http.get('assets/data/database.json')
      .map(res => res.json())
      .map(jsondata => this.jsondata = jsondata.database)
      .map(mycourses => this.mycourses = mycourses.mycourses)
      .map(mycourse => this.mycourse = mycourse);
    return this.results2;
  }

  getCourses(): Observable<Courses[]>{
    this.results3 = this.http.get('assets/data/database.json')
      .map(res => res.json())
      .map(jsondata => this.jsondata = jsondata.database)
      .map(courses => this.courses = courses.courses)
      .map(course => this.course = course);
    return this.results3;
  }

}
