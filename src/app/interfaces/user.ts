import { Course } from './course';

export interface User {
    userid: number;
    username: string;
    password: string;
    coursees: Course[];
}
