import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {
  private fb = inject(FormBuilder);
  private studentService = inject(StudentService);
  private router = inject(Router);

  studentForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    class: ['', Validators.required],
    gender: ['', Validators.required],
    hasHobby: [false],
    hobby: [''],
    favoriteSubject: ['']
  });

  classes = ['6', '7', '8', '9'];
  subjects = ['Mathematics', 'Science', 'English', 'History', 'Geography'];

  get classControl() {
    return this.studentForm.get('class');
  }

  get showHobbyInput() {
    return this.studentForm.get('hasHobby')?.value;
  }

  getClassMessage(): string {
    const selectedClass = this.classControl?.value;
    if (selectedClass === '9') {
      return 'You will appear in board exams soon. All the Best !!';
    } else if (selectedClass === '6') {
      return 'Welcome to middle school!';
    } else if (selectedClass) {
      return 'Education and hobby go hand in hand!';
    }
    return '';
  }

  onSubmit() {
    if (this.studentForm.valid) {
      const formValue = this.studentForm.value;
      const newStudent: Student = {
        name: formValue.name,
        class: formValue.class,
        gender: formValue.gender,
        hasHobby: formValue.hasHobby,
        hobby: formValue.hasHobby ? formValue.hobby : undefined,
        favoriteSubject: formValue.favoriteSubject
      };

      this.studentService.addStudent(newStudent);
      this.router.navigate(['/']);
    } else {
      this.studentForm.markAllAsTouched();
    }
  }
}
