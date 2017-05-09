import { Course } from './course';

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
}
