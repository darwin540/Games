import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router
import { StudentService } from '../servicios/student.service';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  credentials = { email: '', phone: '' };

  constructor(private authService: StudentService, private router: Router) { }

  login() {
    console.log('Intentando iniciar sesión con:', this.credentials); // Para verificar credenciales
    this.authService.login(this.credentials).subscribe(
      (response) => {
        console.log('Inicio de sesión exitoso:', response);
        localStorage.setItem('student', JSON.stringify(response.student));
        this.router.navigate(['/elige-rol']);
      },
      (error) => {
        console.error('Error en el inicio de sesión:', error);
        alert('Credenciales incorrectas');
      }
    );
  }

}
