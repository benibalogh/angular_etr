import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NameService {

  private _nameItemSource = new BehaviorSubject<string>('Name');
  nameItem$ = this._nameItemSource.asObservable();

  constructor() { }

  changeName(name: string) {
    this._nameItemSource.next(name);
  }

}
