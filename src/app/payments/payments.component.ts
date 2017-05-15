import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetDataService } from '../getdata/get-data.service';
import { Payment } from '../interfaces/payment';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {
  user: User;
  userid: number;
  username: string;
  errorMessage: string;
  userPayments: Payment[] = [];

  constructor(private router: Router, private getDataService: GetDataService) { }

  ngOnInit() {
    if (sessionStorage.getItem('name') === null) {
      this.router.navigate(['/login']);
    } else {
      this.username = sessionStorage.getItem('name');
      this.userid = parseInt(sessionStorage.getItem('userid'), 10);

      this.getUserAndPayments();
    }
  }

  getUserAndPayments(): void {
    this.getDataService.getUserById(this.userid).then(user => {
      this.user = user;

      this.getDataService.getPayments().then(payments => {
        for (let p = 0; p < payments.length; p++) {
          if (this.user.paymentids.indexOf(payments[p].paymentid) > -1) {
            this.userPayments.push(payments[p]);
          }
        }
      });
    });
  }

  payIt(payment: Payment): void {
    this.getDataService.payIt(this.userid, payment.paymentid).then(() => {
      let idx = this.userPayments.indexOf(payment);
      if (idx > -1) {
        this.user.paymentstatus.splice(idx, 1, true);
      }
    });
  }

}
