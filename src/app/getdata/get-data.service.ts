import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {User} from '../interfaces/user';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'


@Injectable()
export class GetDataService {

  constructor(private http: Http) { }
  jsondata: Object;
  users: Object;
  user: User[];
  results: Observable<User[]>;

  getDatas(): Observable<User[]>{
    this.results = this.http.get('assets/data/database.json')
      .map(res => res.json())
      .map(jsondata => this.jsondata = jsondata.database)
      .map(users => this.users = users.users)
      .map(user => this.user = user);
    return this.results;
  }
}
