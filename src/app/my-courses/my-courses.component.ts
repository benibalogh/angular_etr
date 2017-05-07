import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetDataService } from '../getdata/get-data.service';
import { Course } from '../interfaces/course';
import { MyCourse } from '../interfaces/mycourse';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css'],
})

export class MyCoursesComponent implements OnInit {
  mycourses: MyCourse[];
  courses: Course[];
  username: string;
  userid: number;
  errorMessage: string;
  // subscribedCourses: Course[];

  constructor(private router: Router, private getDataService: GetDataService) { }

  getMyCourses(): void {
    this.getDataService.getMyCourses()
        .then(mycourses => this.mycourses = mycourses);
  }

  getCourses(): void {
    this.getDataService.getCourses()
        .then(courses => this.courses = courses);
  }

  ngOnInit() {
    this.getMyCourses();
    this.getCourses();

    this.showCourses();
  }

  showCourses() {
    if (sessionStorage.getItem('name') === null) {
      this.router.navigate(['/login']);
    } else {
      this.username = sessionStorage.getItem('name');
      this.userid = parseInt(sessionStorage.getItem('userid'), 10);
    }
    // for(var u of this.courses){}

  }

/*
    this.errorMessage = this.mycourses.length.toString();

for(var mc of this.mycourses){
      if(mc.userid == this.userid){
        this.subscribedCourses = mc.courses;
      }
    }
*/
}
