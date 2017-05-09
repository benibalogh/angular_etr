import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let users = [
      {
        id: 1,
        username: 'admin',
        password: 'admin',
        email: 'admin@admin.com',
        name: 'Kan Ada',
        birthdate: new Date(2017, 4, 6),
        gender: 'Nő',
        isTutor: true,
        courseids: [1, 2, 3]
      },
      {
        id: 2,
        username: 'user',
        password: 'alma',
        email: 'user@gmail.com',
        name: 'Vastag Helga',
        birthdate: new Date(1990, 0, 2),
        gender: 'Nő',
        isTutor: false,
        courseids: [2, 4, 1]
      },
      {
        id: 3,
        username: 'körte',
        password: 'fagyi',
        email: 'korte@gmail.com',
        name: 'Alma Körte',
        birthdate: new Date(1947, 10, 10),
        gender: 'Férfi',
        isTutor: false,
        courseids: []
      },
      {
        id: 4,
        username: 'default',
        password: 'default',
        email: 'default@gmail.com',
        name: 'Default István',
        birthdate: new Date(2000, 2, 21),
        gender: 'Férfi',
        isTutor: false,
        courseids: [3, 4]
      }
    ];

    let courses = [
      {
        courseid: 1,
        name: 'progalap',
        teacher: 'Pofá Zoltán',
        credits: 5
      },
      {
        courseid: 2,
        name: 'Angular',
        teacher: 'Kelep Elek',
        credits: 2
      },
      {
        courseid: 3,
        name: 'Formális nyelvek',
        teacher: 'Égető napsugár',
        credits: 3
      },
      {
        courseid: 4,
        name: 'Prog 1',
        teacher: 'Cserepes Virág',
        credits: 4
      }
    ];

    return {users, courses};
  }

}
