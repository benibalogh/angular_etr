import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.css'],
})
export class FinancesComponent implements OnInit {
  name: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.name = localStorage.getItem('name');
    if (this.name === null) {
      this.router.navigate(['/login']);
    }
  }

}
