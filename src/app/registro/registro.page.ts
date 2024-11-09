import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { StudentService } from '../servicios/student.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  student = {
    name: '',
    email: '',
    phone: '',
    language: ''
  };
  router: any;

  constructor(
    private studentService: StudentService,
    private alertController: AlertController
  ) {}

  registerStudent() {
    if (
      this.student.name &&
      this.student.email &&
      this.student.phone &&
      this.student.language
    ) {
      
      if (!this.validateEmail(this.student.email)) {
        this.presentAlert('Error', 'Por favor, ingrese un correo válido.');
        return;
      }

      if (this.student.phone.length !== 10) {
        this.presentAlert('Error', 'El teléfono debe tener 10 dígitos.');
        return;
      }

      this.studentService.createStudent(this.student).subscribe(
        async response => {
          console.log('Usuario registrado:', response);

          localStorage.setItem('userRole', this.student.language);

          await this.presentAlert('Éxito', 'Usuario registrado exitosamente.');
          this.resetForm();
          this.router.navigate(['/salas']);
        },
        async error => {
          console.error('Error al registrar usuario:', error);
          await this.presentAlert(
            'Error',
            'Hubo un problema al registrar el usuario.'
          );
        }
      );
    }
  }

  resetForm() {
    this.student = {
      name: '',
      email: '',
      phone: '',
      language: ''
    };
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
