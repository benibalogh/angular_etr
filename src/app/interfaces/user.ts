import { CourseExam } from './course-exam';

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  name: string;
  birthdate: Date;
  gender: string;
  isTutor: boolean;
  payments: object[];
  courseids: number[];
  paymentids: number[];
  paymentstatus: boolean[];
  scholarshipids: number[];
  exams: CourseExam[];
}
