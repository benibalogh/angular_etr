import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let users = [
      {userid: 1, username: 'admin', password: 'admin'},
      {userid: 2, username: 'user', password: 'alma'},
      {userid: 3, username: 'körte', password: 'fagyi'}
    ];

    let mycourses = [
      {userid: 1, courseids: [1, 2, 3]},
      {userid: 2, courseids: [2, 4, 1]},
      {userid: 3, courseids: []}
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

    return {users, mycourses, courses};
  }
}
