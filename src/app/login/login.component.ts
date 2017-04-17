import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { NgForm} from '@angular/forms';
import {Http} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {GetDataService} from '../getdata/get-data.service';
import {User} from '../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[GetDataService]
})
export class LoginComponent implements OnInit {
    errorMessage: string;
    user:User[];
    data;
    loggedIn:Boolean;
 
    constructor(private http:Http, private getDataService: GetDataService, private router:Router) {

    }

  ngOnInit() {
    
  }

  login(form: NgForm){
      console.log(this.user);
      if(!form.valid){
        if(form.value.username == "" || form.value.password =="")
          this.errorMessage = "sadasdasd";
          return;
      }
      this.getDataService.getDatas().subscribe(
      user => this.user = user);
    

    
    
  }
  
}
