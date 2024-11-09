import { StudentService } from './../servicios/student.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-assign-sala',
  templateUrl: './assign-sala.page.html',
  styleUrls: ['./assign-sala.page.scss'],
})
export class AssignSalaPage implements OnInit {

  assignSalaForm: FormGroup;
  students: any[] = [];

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder
  ) {
    this.assignSalaForm = this.fb.group({
      studentId: ['', Validators.required],
      salaId: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getStudents().subscribe(
      (response) => {
        this.students = response.students;
      },
      (error) => {
        console.error('Error loading students:', error);
      }
    );
  }

  assignSala(): void {
    const studentId = this.assignSalaForm.get('studentId')?.value;
    const salaId = this.assignSalaForm.get('salaId')?.value;

    this.studentService.assignSala(studentId, salaId).subscribe(
      (response) => {
        console.log('Sala assigned successfully:', response);
        alert('Sala asignada correctamente');
      },
      (error) => {
        console.error('Error assigning sala:', error);
        alert('Error asignando sala');
      }
    );
  }

}
