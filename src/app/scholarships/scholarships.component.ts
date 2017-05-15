import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetDataService } from '../getdata/get-data.service';
import { Scholarship } from '../interfaces/scholarship';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-scholarships',
  templateUrl: './scholarships.component.html',
  styleUrls: ['./scholarships.component.css'],
})
export class ScholarshipsComponent implements OnInit {
  user: User;
  userid: number;
  username: string;
  errorMessage: string;
  userScholarships: Scholarship[] = [];

  constructor(private router: Router, private getDataService: GetDataService) { }

  ngOnInit() {
    if (sessionStorage.getItem('name') === null) {
      this.router.navigate(['/login']);
    } else {
      this.username = sessionStorage.getItem('name');
      this.userid = parseInt(sessionStorage.getItem('userid'), 10);

      this.getUserAndScholarships();
    }
  }

  getUserAndScholarships(): void {
    this.getDataService.getUserById(this.userid).then(user => {
      this.user = user;

      this.getDataService.getScholarships().then(scholarships => {
        for (let s = 0; s < scholarships.length; s++) {
          if (this.user.scholarshipids.indexOf(scholarships[s].scholarshipid) > -1) {
            this.userScholarships.push(scholarships[s]);
          }
        }
      });
    });
  }

}
