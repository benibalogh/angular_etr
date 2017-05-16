import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { GivenNamePipe } from './../_pipes/given-name.pipe';
import { NameService } from './../name.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {

  name: string;
  subscription: Subscription;

  constructor(private router: Router, private _nameService: NameService) { }

  ngOnInit() {
    this.subscription = this._nameService.nameItem$
        .subscribe(name => this.name = name);  // subscribe for nameItem stream to receive updates for the displayed name of the user

    this.name = sessionStorage.getItem('name');
  }

  logout(): void {
    sessionStorage.clear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
