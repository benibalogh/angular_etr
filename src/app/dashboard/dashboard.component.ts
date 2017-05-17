import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { GivenNamePipe } from './../_pipes/given-name.pipe';
import { AuthService } from './../_services/auth.service';
import { NameService } from '../_services/name.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {

  name: string;
  subscription: Subscription;

  constructor(private router: Router, private authService: AuthService, private _nameService: NameService) { }

  ngOnInit() {
    this.subscription = this._nameService.nameItem$
        .subscribe(name => this.name = name);  // subscribe for nameItem stream to receive updates for the displayed name of the user

    this.name = localStorage.getItem('name');
    // display my-courses component as the content of dashboard
    this.router.navigate(['/dashboard/my-courses']);
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
