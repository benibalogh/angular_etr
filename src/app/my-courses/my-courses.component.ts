import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data/data.service';
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
  infoMessage: string;
  loading: boolean;
  subscribedCourses: Course[] = [];

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit() {
    if (localStorage.getItem('name') === null) {
      this.router.navigate(['/login']);
    } else {
      this.userid = parseInt(localStorage.getItem('userid'), 10);

      this.getUserAndCourses();
    }
  }

  getUserAndCourses(): void {
    this.loading = true;
    this.dataService.getUserById(this.userid).then(user => {
      this.user = user;

      this.dataService.getCourses().then(courses => {
        this.loading = false;
        for (let c = 0; c < courses.length; c++) {
          if (this.user.courseids.indexOf(courses[c].courseid) > -1) {
            this.subscribedCourses.push(courses[c]);
          }
        }
        if (!this.subscribedCourses.length) {
          this.infoMessage = 'Még nincs felvéve kurzusod!';
        }
      });
    });
  }

  dropCourse(course: Course): void {
    this.dataService.dropCourse(this.userid, course.courseid).then(() => {
      let idx = this.subscribedCourses.indexOf(course);
      if (idx > -1) {
        this.subscribedCourses.splice(idx, 1);
        if (!this.subscribedCourses.length) {
          this.infoMessage = 'Még nincs felvéve kurzusod!';
        }
      }
    });
  }

}
