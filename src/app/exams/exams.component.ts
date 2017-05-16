import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../data/data.service';
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
  infoMessage: string;
  courses: Course[] = [];
  subscribedCourses: Course[] = [];
  loading: boolean;

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
    this.loading = true;
    this.dataService.getUserById(this.userid).then(user => {
      this.user = user;

      this.dataService.getCourses().then(courses => {
        this.courses = courses;

        for (let c = 0; c < courses.length; c++) {
          if (this.user.courseids.indexOf(courses[c].courseid) > -1) {
            this.subscribedCourses.push(courses[c]);
          }
        }

        if (!this.subscribedCourses.length) {
          this.infoMessage = 'Nincs felvett kurzusod!';
        }
        this.loading = false;
      });
    });
  }

  isSubscribedToExam(course: Course, exam: Exam): boolean {
    for (let i = 0; i < this.user.exams.length; i++) {
      var courseExam: CourseExam = this.user.exams[i];
      if (courseExam.courseId === course.courseid) {
        return courseExam.examId === exam.courseExamId;
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
    this.dataService.takeExam(this.userid, course.courseid, exam.courseExamId).then(user => {
      this.user = user;
    });
  }

  changeExam(course: Course, exam: Exam): void {
    this.dataService.changeExam(this.userid, course.courseid, exam.courseExamId).then(user => {
      this.user = user;
    });
  }

  dropExam(course: Course, exam: Exam): void {
    this.dataService.dropExam(this.userid, course.courseid, exam.courseExamId).then(user => {
      this.user = user;
    });
  }

}
