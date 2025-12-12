import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [
    {
      name: 'Rohan Sharma',
      class: '9',
      gender: 'Male',
      hasHobby: true,
      hobby: 'Cricket',
      favoriteSubject: 'Mathematics'
    },
    {
      name: 'Anjali Gupta',
      class: '8',
      gender: 'Female',
      hasHobby: false,
      favoriteSubject: 'Science'
    }
  ];

  private studentsSubject = new BehaviorSubject<Student[]>(this.students);
  students$ = this.studentsSubject.asObservable();

  constructor() { }

  getStudents(): Observable<Student[]> {
    return this.students$;
  }

  addStudent(student: Student): void {
    this.students.push(student);
    this.studentsSubject.next([...this.students]);
  }
}
