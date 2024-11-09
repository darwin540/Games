import { StudentService } from './../servicios/student.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.page.html',
  styleUrls: ['./sigin.page.scss'],
})
export class SiginPage {

  loginForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private studentService: StudentService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Por favor ingrese un correo electrónico y un teléfono válidos.';
      return;
    }

    this.studentService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.successMessage = 'Login exitoso';
        this.errorMessage = '';
        console.log(response); // Puedes usar esta respuesta como prefieras
      },
      error: (error) => {
        this.errorMessage = error.error.message || 'Error en el login';
        this.successMessage = '';
      }
    });
  }
}
