import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from './../servicios/student.service';

@Component({
  selector: 'app-assign-image',
  templateUrl: './assign-image.page.html',
  styleUrls: ['./assign-image.page.scss'],
})
export class AssignImagePage implements OnInit {

   assignImageForm: FormGroup;
  students: any[] = [];
  selectedFile: File | null = null;

  constructor(
    private studentService: StudentService,
    private fb: FormBuilder
  ) {
    this.assignImageForm = this.fb.group({
      studentId: ['', Validators.required]
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

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  assignImage(): void {
    const studentId = this.assignImageForm.get('studentId')?.value;

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('profile_picture', this.selectedFile);

      this.studentService.uploadProfilePicture(studentId, formData).subscribe(
        (response) => {
          console.log('Imagen de perfil asignada correctamente:', response);
          alert('Imagen asignada correctamente');
          this.updateStudentImage(studentId, response.student.profile_picture);
        },
        (error) => {
          console.error('Error asignando la imagen:', error);
          alert('Error asignando la imagen');
        }
      );
    } else {
      alert('Por favor, selecciona una imagen');
    }
  }

  updateStudentImage(studentId: number, imageUrl: string): void {
    const student = this.students.find((s) => s.id === studentId);
    if (student) {
      student.profile_picture = imageUrl;
    }
  }

  getImageUrl(imagePath: string): string {
    return `http://127.0.0.1:8000/storage/${imagePath}`;
  }
}
