import { Component, OnInit } from '@angular/core';
import { StudentService } from '../servicios/student.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-crud',
  templateUrl: './student-crud.page.html',
  styleUrls: ['./student-crud.page.scss'],
})
export class StudentCrudPage implements OnInit {

  students: any[] = [];
  studentForm: FormGroup;
  isEditing = false;
  currentStudentId: number | null = null;

  constructor(private studentService: StudentService, private fb: FormBuilder) {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      language: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents().subscribe((response) => {
      this.students = response.students;
    });
  }

  onSubmit(): void {
    if (this.studentForm.invalid) return;

    const studentData = this.studentForm.value;

    if (this.isEditing && this.currentStudentId) {
      this.studentService.updateStudent(this.currentStudentId, studentData).subscribe(() => {
        this.getStudents();
        this.resetForm();
      });
    } else {
      this.studentService.createStudent(studentData).subscribe(() => {
        this.getStudents();
        this.resetForm();
      });
    }
  }

  editStudent(student: any): void {
    this.isEditing = true;
    this.currentStudentId = student.id;
    this.studentForm.patchValue(student);
  }

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.getStudents();
    });
  }

  resetForm(): void {
    this.studentForm.reset();
    this.isEditing = false;
    this.currentStudentId = null;
  }
}