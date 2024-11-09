import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // Importa IonicModule aquí

@Component({
  selector: 'app-nombre-componente',
  templateUrl: './nombre-componente.component.html',
  styleUrls: ['./nombre-componente.component.scss'],
  standalone: true,
  imports: [IonicModule] // Asegúrate de que IonicModule está en el array
})
export class NombreComponenteComponent {
  nombre = '';
  correo = '';
}
