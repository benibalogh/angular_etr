import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {
  username: string;
  constructor(private router:Router) { 
    
  }

  ngOnInit() {
    if(sessionStorage.getItem("name") == undefined){
      this.router.navigate(['/login']);
    }else {
      this.username = sessionStorage.getItem("name");
    }
  }

}
