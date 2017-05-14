import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetDataService } from '../getdata/get-data.service';
import { Finance } from '../interfaces/finance';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-finances',
  templateUrl: './finances.component.html',
  styleUrls: ['./finances.component.css'],
})
export class FinancesComponent implements OnInit {
  user: User;
  userid: number;
  username: string;
  errorMessage: string;
  userFinances: Finance[] = [];

  constructor(private router: Router, private getDataService: GetDataService) { }

  ngOnInit() {
    if (sessionStorage.getItem('name') === null) {
      this.router.navigate(['/login']);
    } else {
      this.username = sessionStorage.getItem('name');
      this.userid = parseInt(sessionStorage.getItem('userid'), 10);

      this.getUserAndFinances();
    }
  }

  getUserAndFinances(): void {
    this.getDataService.getUserById(this.userid).then(user => {
      this.user = user;

      this.getDataService.getFinances().then(finances => {
        for (let f = 0; f < finances.length; f++) {
          if (this.user.financeids.indexOf(finances[f].financeid) > -1) {
            this.userFinances.push(finances[f]);
          }
        }
      });
    });
  }

  payFinance(finance: Finance): void {
    this.getDataService.payFinance(this.userid, finance.financeid).then(() => {
      let idx = this.userFinances.indexOf(finance);
      if (idx > -1) {
        this.user.financestatus.splice(idx, 1, true);
      }
    });
  }

}
