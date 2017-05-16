import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data/data.service';
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

  constructor(private router: Router, private DataService: DataService) { }

  ngOnInit() {
    if (localStorage.getItem('name') === null) {
      this.router.navigate(['/login']);
    } else {
      this.username = localStorage.getItem('name');
      this.userid = parseInt(localStorage.getItem('userid'), 10);

      this.getUserAndPayments();
    }
  }

  getUserAndPayments(): void {
    this.DataService.getUserById(this.userid).then(user => {
      this.user = user;

      this.DataService.getPayments().then(payments => {
        for (let p = 0; p < payments.length; p++) {
          if (this.user.paymentids.indexOf(payments[p].paymentid) > -1) {
            this.userPayments.push(payments[p]);
          }
        }
      });
    });
  }

  payIt(payment: Payment): void {
    this.DataService.payIt(this.userid, payment.paymentid).then(() => {
      let idx = this.userPayments.indexOf(payment);
      if (idx > -1) {
        this.user.paymentstatus.splice(idx, 1, true);
      }
    });
  }

}
