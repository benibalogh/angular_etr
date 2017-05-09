import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetDataService } from '../getdata/get-data.service';
import { Course } from '../interfaces/course';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})

export class CoursesComponent implements OnInit {
  user: User;
  userid: number;
  username: string;
  errorMessage: string;
  courses: Course[] = [];
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
        this.courses = courses;

        for (let c = 0; c < courses.length; c++) {
          if (this.user.courseids.indexOf(courses[c].courseid) > -1) {
            this.subscribedCourses.push(courses[c]);
          }
        }
      });
    });
  }

  takeCourse(course: Course): void {
    this.getDataService.takeCourse(this.userid, course.courseid).then(() => {
      this.router.navigate(['dashboard/my-courses']);
      this.subscribedCourses.push(course);
    });
  }

}
