import { Component, OnInit } from '@angular/core';
import { StudentService } from '../servicios/student.service';

@Component({
  selector: 'app-info-personaje',
  templateUrl: './info-personaje.page.html',
  styleUrls: ['./info-personaje.page.scss'],
})
export class InfoPersonajePage implements OnInit {
  // Atributos del personaje
  attributes = [
    { name: 'Estamina', value: 50 },
    { name: 'Balance', value: 50 },
    { name: 'Resistencia', value: 50 },
    { name: 'Conocimiento', value: 50 },
    { name: 'F.Voluntad', value: 50 },
    { name: 'Carisma', value: 50 },
  ];

  // Lista de amigos
  friends: { name: string; level: number; profile_picture: string }[] = [];

  // Barras de vida, mana y equipamiento
  health = 0.8;
  mana = 0.6;
  equip = 0.5;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.loadFriends(); // Cargar amigos al iniciar
  }

  // Método para cargar amigos desde el servicio
  loadFriends() {
    this.studentService.getStudents().subscribe(
      (response) => {
        // Mapear la respuesta para incluir la URL de la imagen de perfil
        this.friends = response.students.map((student: any) => ({
          name: student.name,
          level: 0, // Aquí puedes definir la lógica para el nivel
          profile_picture: student.profile_picture
            ? this.getImageUrl(student.profile_picture)
            : 'assets/default-profile.png', // Imagen predeterminada si no hay imagen de perfil
        }));
      },
      (error) => {
        console.error('Error al cargar amigos:', error);
      }
    );
  }

  // Método para construir la URL completa de la imagen
  getImageUrl(imagePath: string): string {
    return `http://127.0.0.1:8000/storage/${imagePath}`;
  }

  // Métodos para manejar la lista de amigos
  sendMessage(friend: { name: string }) {
    console.log('Enviar mensaje a:', friend.name);
  }

  removeFriend(friend: { name: string }) {
    console.log('Eliminar amigo:', friend.name);
  }

  // Métodos para manipular barras (opcional)
  adjustHealth(value: number) {
    this.health = Math.min(1, Math.max(0, this.health + value));
  }

  adjustMana(value: number) {
    this.mana = Math.min(1, Math.max(0, this.mana + value));
  }

  adjustEquip(value: number) {
    this.equip = Math.min(1, Math.max(0, this.equip + value));
  }
}
