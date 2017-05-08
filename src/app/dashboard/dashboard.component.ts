import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GivenNamePipe } from './../_pipes/given-name.pipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {

  name: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.name = sessionStorage.getItem('name');
    if (this.name === null) {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    sessionStorage.clear();
    // sessionStorage.removeItem('userid');
    // sessionStorage.removeItem('name');
  }

}
