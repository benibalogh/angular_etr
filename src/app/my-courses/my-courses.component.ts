import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import {GetDataService} from '../getdata/get-data.service';
import {Courses} from '../interfaces/courses';
import {MyCourses} from '../interfaces/mycourses';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css'],
  providers:[GetDataService]
})

export class MyCoursesComponent implements OnInit {
  mycourses: MyCourses[];
  courses: Courses[];
  username: string;
  userid:number;

  constructor(private router:Router, private getDataService: GetDataService,) { 
    this.getDataService.getMyCourses().subscribe(
    mycourses => this.mycourses = mycourses);

    this.getDataService.getCourses().subscribe(
    courses => this.courses = courses);
  }

  ngOnInit() {
    if(sessionStorage.getItem("name") == undefined){
      this.router.navigate(['/login']);
    }else {
      this.username = sessionStorage.getItem("name");
      this.userid = parseInt(sessionStorage.getItem("userid"));
    }


  }

}
