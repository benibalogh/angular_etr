import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GetDataService } from '../getdata/get-data.service';
import { CourseExam } from '../interfaces/course-exam';
import { Course } from '../interfaces/course';
import { Exam } from '../interfaces/exam';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css'],
})
export class ExamsComponent implements OnInit {
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

  isSubscribedToExam(course: Course, exam: Exam): boolean {
    for (let i = 0; i < this.user.exams.length; i++) {
      var courseExam: CourseExam = this.user.exams[i];
      if (courseExam.courseId === course.courseid) {
        if (courseExam.examId === exam.courseExamId) {
          return true;
        } else {
          return false;
        }
      }
    }

    return false;
  }

  isSubscribedToAnyExamForCourse(course: Course, exam: Exam): boolean {
    for (let i = 0; i < this.user.exams.length; i++) {
      var courseExam: CourseExam = this.user.exams[i];
      if (courseExam.courseId === course.courseid) {
        return true;
      }
    }

    return false;
  }

  takeExam(course: Course, exam: Exam): void {
    this.getDataService.takeExam(this.userid, course.courseid, exam.courseExamId).then(user => {
      this.user = user;
    });
  }

  changeExam(course: Course, exam: Exam): void {
    this.getDataService.changeExam(this.userid, course.courseid, exam.courseExamId).then(user => {
      this.user = user;
    });
  }

  dropExam(course: Course, exam: Exam): void {
    this.getDataService.dropExam(this.userid, course.courseid, exam.courseExamId).then(user => {
      this.user = user;
    });
  }

}
