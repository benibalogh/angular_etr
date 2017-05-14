import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { User } from '../interfaces/user';
import { Course } from '../interfaces/course';
import { CourseExam } from '../interfaces/course-exam';
import { Finance } from '../interfaces/finance';

@Injectable()
export class GetDataService {

  private usersUrl = 'api/users';  // URL to web api
  private coursesUrl = 'api/courses';  // URL to web api
  private financesUrl = 'api/finances';  // URL to web api

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  public getUsers(): Promise<User[]> {
    return this.http.get(this.usersUrl)
               .toPromise()
               .then(res => res.json().data as User[])
               .catch(this.handleError);
  }

  public getCourses(): Promise<Course[]> {
    return this.http.get(this.coursesUrl)
               .toPromise()
               .then(res => res.json().data as Course[])
               .catch(this.handleError);
  }
  
  public getFinances(): Promise<Finance[]> {
    return this.http.get(this.financesUrl)
               .toPromise()
               .then(res => res.json().data as Finance[])
               .catch(this.handleError);
  }

  public takeCourse(userid: number, courseid: number): Promise<void> {
    const url = `${this.usersUrl}/${userid}`;
    return this.http.get(url)
      .toPromise()
      .then(res => {
        let user: User = res.json().data as User;
        let idx = user.courseids.indexOf(courseid);
        if (idx == -1) {
          user.courseids.push(courseid);
          this.http.post(url, user).toPromise();
        }
      });
  }

  public dropCourse(userid: number, courseid: number): Promise<void> {
    const url = `${this.usersUrl}/${userid}`;
    return this.http.get(url)
      .toPromise()
      .then(res => {
        let user: User = res.json().data as User;
        let idx = user.courseids.indexOf(courseid);
        if (idx > -1) {
          user.courseids.splice(idx, 1);
        }

        this.http.post(url, user).toPromise();
      });
  }
  
   public payFinance(userid: number, financeid: number): Promise<void> {
    const url = `${this.usersUrl}/${userid}`;
    return this.http.get(url)
      .toPromise()
      .then(res => {
        let user: User = res.json().data as User;
        let idx = user.financeids.indexOf(financeid);
        if (idx > -1) {
          user.financestatus.splice(idx, 1, true);
        }

        this.http.post(url, user).toPromise();
      });
  }

  public takeExam(userId: number, courseId: number, examId: number): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      const url = `${this.usersUrl}/${userId}`;
      this.http.get(url)
        .toPromise()
        .then(res => {
          let user: User = res.json().data as User;

          let alreadyTaken: boolean = false;
          for (let courseExam of user.exams) {
            if (courseExam.courseId === courseId) {
              alreadyTaken = true; // Already taken an exam for this course.
            }
          }

          if (!alreadyTaken)  {
            user.exams.push({
              courseId: courseId,
              examId: examId
            });

            this.saveUser(userId, user)
              .then(() => resolve(user))
              .catch(() => reject());
          }
        })
        .catch(() => reject());
    });
  }

  public changeExam(userId: number, courseId: number, examId: number): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      const url = `${this.usersUrl}/${userId}`;
      this.http.get(url)
        .toPromise()
        .then(res => {
          let user: User = res.json().data as User;

          for (let courseExam of user.exams) {
            if (courseExam.courseId === courseId) {
              courseExam.examId = examId; // Override current exam for this course
              this.saveUser(userId, user)
                .then(() => resolve(user))
                .catch(() => reject());
              break;
            }
          }
        })
        .catch(() => reject());
    });
  }

  public dropExam(userId: number, courseId: number, examId: number): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      const url = `${this.usersUrl}/${userId}`;
      this.http.get(url)
        .toPromise()
        .then(res => {
          let user: User = res.json().data as User;

          for (let i = 0; i < user.exams.length; i++) {
            if (user.exams[i].courseId === courseId) {
              user.exams.splice(i, 1);
              this.saveUser(userId, user)
                .then(() => resolve(user))
                .catch(() => reject());
              break;
            }
          }
        })
        .catch(() => reject());
    });
  }

  public createUser(user: User): Promise<User> {
    return this.http
      .post(this.usersUrl, JSON.stringify({
                                username: user.username,
                                password: user.password,
                                email: user.email,
                                name: user.name,
                                birthdate: user.birthdate,
                                gender: user.gender,
                                isTutor: user.isTutor
                              }), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as User)
      .catch(this.handleError);
  }

  public saveUser(userId: number, user: User): Promise<Response> {
    const url = `${this.usersUrl}/${userId}`;
    return this.http.post(url, JSON.stringify(user))
      .toPromise()
      .catch(this.handleError);
  }

  public getUserById(id: number): Promise<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(res => res.json().data as User)
      .catch(this.handleError);
  }

  public getUserByUsername(username: string): Promise<any> {
    const url = `${this.usersUrl}?username=^${username}$`;
    return this.http.get(url)
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  public registerUser(user: User): Promise<User> {
    return new Promise<User>(
      (resolve, reject) => {
        this.getUserByUsername(user.username)
          .then((res) => {
            if (!Object.keys(res).length)  {  // check for empty res -> no user with the same username exists
              resolve(this.createUser(user));
            } else {
              resolve(null);
            }
          });
      });
  }

  public updateUser(user: User): Promise<User> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.http
      .put(url, JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then( () => user)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred with server request', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
