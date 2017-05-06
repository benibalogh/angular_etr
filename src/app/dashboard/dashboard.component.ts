import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username: string;

  constructor() { }

  ngOnInit() {
    this.username = sessionStorage.getItem('name');
  }

  logout(): void {
    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('name');
  }

}
