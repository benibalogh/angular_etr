import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetDataService } from '../getdata/get-data.service';
import { Course } from '../interfaces/course';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css'],
})

export class MyCoursesComponent implements OnInit {
  user: User;
  userid: number;
  username: string;
  errorMessage: string;
  subscribedCourses: Course[] = [];

  constructor(private router: Router, private getDataService: GetDataService) { }

  ngOnInit() {
    if (sessionStorage.getItem('name') === null) {
      this.router.navigate(['/login']);
    } else {
      this.username = sessionStorage.getItem('name');
      this.userid = parseInt(sessionStorage.getItem('userid'), 10);

      this.getUserAndCourses();
    }
  }

  getUserAndCourses(): void {
    this.getDataService.getUserById(this.userid).then(user => {
      this.user = user;

      this.getDataService.getCourses().then(courses => {
        for (let c = 0; c < courses.length; c++) {
          if (this.user.courseids.indexOf(courses[c].courseid) > -1) {
            this.subscribedCourses.push(courses[c]);
          }
        }
      });
    });
  }

  dropCourse(course: Course): void {
    this.getDataService.dropCourse(this.userid, course.courseid).then(() => {
      let idx = this.subscribedCourses.indexOf(course);
      if (idx > -1) {
        this.subscribedCourses.splice(idx, 1);
      }
    });
  }

}
