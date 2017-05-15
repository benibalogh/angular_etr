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
        courseids: [1, 2, 3],
		paymentids: [1, 2, 3],
		paymentstatus: [true, false, false],
		scholarshipids: [1, 2, 3, 4],
        exams: []
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
        courseids: [2, 4, 1],
		paymentids: [3, 4],
		paymentstatus: [false, false],
		scholarshipids: [1, 3],
        exams: []
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
        courseids: [],
		paymentids: [1, 4],
		paymentstatus: [true, true],
		scholarshipids: [2, 4],
        exams: []
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
        courseids: [3, 4],
		paymentids: [],
		paymentstatus: [],
		scholarshipids: [],
        exams: []
      }
    ];

    let courses = [
      {
        courseid: 1,
        name: 'Programozás Alapjai',
        teacher: 'Pofá Zoltán',
        credits: 5,
        exams: [
          {
            courseExamId: 1,
            maxSize: 20,
            participants: [],
            classRoom: 'CX-502B',
            date: new Date(2017, 6, 7, 8, 0)
          },
          {
            courseExamId: 2,
            maxSize: 50,
            participants: [],
            classRoom: 'CX-501A',
            date: new Date(2017, 6, 7, 14, 30)
          },
          {
            courseExamId: 3,
            maxSize: 20,
            participants: [],
            classRoom: 'CX-502B',
            date: new Date(2017, 6, 14, 8, 0)
          },
          {
            courseExamId: 4,
            maxSize: 50,
            participants: [],
            classRoom: 'CX-501A',
            date: new Date(2017, 6, 14, 14, 30)
          },
          {
            courseExamId: 5,
            maxSize: 20,
            participants: [],
            classRoom: 'CX-502B',
            date: new Date(2017, 6, 21, 8, 0)
          },
          {
            courseExamId: 6,
            maxSize: 50,
            participants: [],
            classRoom: 'CX-501A',
            date: new Date(2017, 6, 21, 14, 30)
          }
        ]
      },
      {
        courseid: 2,
        name: 'Angular',
        teacher: 'Kelep Elek',
        credits: 2,
        exams: [
          {
            courseExamId: 1,
            maxSize: 25,
            participants: [],
            classRoom: 'CX-504',
            date: new Date(2017, 6, 6, 12, 0)
          },
          {
            courseExamId: 2,
            maxSize: 25,
            participants: [],
            classRoom: 'CX-504',
            date: new Date(2017, 6, 13, 12, 0)
          },
          {
            courseExamId: 3,
            maxSize: 25,
            participants: [],
            classRoom: 'CX-504',
            date: new Date(2017, 6, 20, 12, 0)
          }
        ]
      },
      {
        courseid: 3,
        name: 'Formális nyelvek',
        teacher: 'Égető Napsugár',
        credits: 3,
        exams: [
          {
            courseExamId: 1,
            maxSize: 10,
            participants: [],
            classRoom: 'CX-509',
            date: new Date(2017, 6, 6, 12, 0)
          },
          {
            courseExamId: 2,
            maxSize: 10,
            participants: [],
            classRoom: 'CX-509',
            date: new Date(2017, 6, 13, 12, 0)
          },
          {
            courseExamId: 3,
            maxSize: 10,
            participants: [],
            classRoom: 'CX-509',
            date: new Date(2017, 6, 20, 12, 0)
          }
        ]
      },
      {
        courseid: 4,
        name: 'Programozás 1',
        teacher: 'Cserepes Virág',
        credits: 4,
        exams: [
          {
            courseExamId: 1,
            maxSize: 20,
            participants: [],
            classRoom: 'CX-502B',
            date: new Date(2017, 6, 8, 10, 0)
          },
          {
            courseExamId: 2,
            maxSize: 20,
            participants: [],
            classRoom: 'CX-502B',
            date: new Date(2017, 6, 8, 12, 0)
          },
          {
            courseExamId: 3,
            maxSize: 20,
            participants: [],
            classRoom: 'CX-502B',
            date: new Date(2017, 6, 15, 10, 0)
          },
          {
            courseExamId: 4,
            maxSize: 20,
            participants: [],
            classRoom: 'CX-502B',
            date: new Date(2017, 6, 15, 12, 0)
          },
          {
            courseExamId: 5,
            maxSize: 20,
            participants: [],
            classRoom: 'CX-502B',
            date: new Date(2017, 6, 22, 10, 0)
          },
          {
            courseExamId: 6,
            maxSize: 20,
            participants: [],
            classRoom: 'CX-502B',
            date: new Date(2017, 6, 22, 12, 0)
          }
        ]
      }
    ];
	
	let finances = [
		{
			financeid: 1,
			name: 'Móra Ferenc Kollégium kollégiumi díj',
			deadline: new Date(2017, 5, 10),
			amount: 9360
		},
		{
			financeid: 2,
			name: 'TTIK Tantárgy újrafelvételi díj',
			deadline: new Date(2017, 6, 11),
			amount: 4000
		},
		{
			financeid: 3,
			name: 'TTIK Utóvizsga díj',
			deadline: new Date(2017, 6, 11),
			amount: 7000
		},
		{
			financeid: 4,
			name: 'Károlyi Mihály Kollégium kollégiumi díj',
			deadline: new Date(2017, 5, 11),
			amount: 9560
		}
	];
	
	let scholarships = [
		{
			scholarshipid: 1,
			name: 'TTIK Állandó szociális támogatás',
			date: new Date(2017, 4, 10),
			amount: 10000
		},
		{
			scholarshipid: 2,
			name: 'TTIK Tanulmányi ösztöndíj',
			date: new Date(2017, 4, 10),
			amount: 15000
		},
		{
			scholarshipid: 3,
			name: 'TTIK Állandó szociális támogatás',
			date: new Date(2017, 5, 10),
			amount: 10000
		},
		{
			scholarshipid: 4,
			name: 'TTIK Tanulmányi ösztöndíj',
			date: new Date(2017, 5, 10),
			amount: 15000
		}
	];
	

    return {users, courses, scholarships};
  }

}
