import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data/data.service';
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

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    if (localStorage.getItem('name') === null) {
      this.router.navigate(['/login']);
    } else {
      this.username = localStorage.getItem('name');
      this.userid = parseInt(localStorage.getItem('userid'), 10);

      this.getUserAndCourses();
    }
  }

  getUserAndCourses(): void {
    this.dataService.getUserById(this.userid).then(user => {
      this.user = user;

      this.dataService.getCourses().then(courses => {
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
    this.dataService.takeCourse(this.userid, course.courseid).then(() => {
      this.router.navigate(['dashboard/my-courses']);
      this.subscribedCourses.push(course);
    });
  }

}
