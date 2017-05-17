import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NameService {

  private _nameItemSource = new BehaviorSubject<string>('Name');
  // a stream of names...
  nameItem$ = this._nameItemSource.asObservable();

  constructor() { }

  // emit changed name
  changeName(name: string) {
    this._nameItemSource.next(name);
  }

}
