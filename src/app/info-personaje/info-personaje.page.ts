import { Component, OnInit,ViewChild  } from '@angular/core';
import { StudentService } from '../servicios/student.service';

@Component({
  selector: 'app-info-personaje',
  templateUrl: './info-personaje.page.html',
  styleUrls: ['./info-personaje.page.scss'],
})
export class InfoPersonajePage implements OnInit {
  @ViewChild('fileInput') fileInput: any;
  imageSrc: string = 'assets/personajes/image.webp'; 
  // Método para seleccionar archivo (local)
  selectImage() {
    this.fileInput.nativeElement.click();
  }

  // Método para manejar la selección de archivo local
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Método para actualizar la imagen desde el backend
  updateImageFromBackend(imageUrl: string) {
    this.imageSrc = imageUrl;
  }
  // Atributos del personaje
  fuerza: number = 50;
  estamina: number = 50;
  balance: number = 50;
  resistencia: number = 50;
  conocimiento: number = 50;
  destreza: number = 50;
  Fvoluntad: number = 50;
  carisma: number = 50;
  construccion: number = 50;
  musculatura: number = 50;
  punteria: number = 50;
  inteligencia: number = 50;
  salud: number = 50;
  logica: number = 50;
  sabiduria: number = 50;
  intuicion: number = 50;
  verborrea: number = 50;
  apariencia: number = 50;

  // Lista de amigos
  friends: { name: string; level: number; profile_picture: string }[] = [];

  // Barras de vida, mana y equipamiento
  health = 0.8;
  mana = 0.6;
  equip = 0.5;

  constructor(private studentService: StudentService) {
    this.calcularMagia();
  }

  ngOnInit() {
    this.loadFriends(); // Cargar amigos al iniciar
  }

  // Métodos para cargar amigos desde el servicio
  loadFriends() {
    this.studentService.getStudents().subscribe(
      (response) => {
        this.friends = response.students.map((student: any) => ({
          name: student.name,
          level: 0, // Lógica para el nivel
          profile_picture: student.profile_picture
            ? this.getImageUrl(student.profile_picture)
            : 'assets/default-profile.png',
        }));
      },
      (error) => {
        console.error('Error al cargar amigos:', error);
      }
    );
  }

  // Métodos de cálculo de atributos
  calcularMagia(): void {
    this.estamina = 100 - this.fuerza;
    this.musculatura = 100 - this.estamina;
  }

  calcularDestreza(): void {
    this.resistencia = 100 - this.destreza;
    this.salud = 100 - this.resistencia;
  }

  calcularConstruccion(): void {
    this.Fvoluntad = 100 - this.construccion;
    this.intuicion = 100 - this.Fvoluntad;
  }

  calcularInteligencia(): void {
    this.balance = 100 - this.inteligencia;
    this.punteria = 100 - this.balance;
  }

  calcularSabiduria(): void {
    this.conocimiento = 100 - this.sabiduria;
    this.logica = 100 - this.conocimiento;
  }

  calcularApariencia(): void {
    this.carisma = 100 - this.apariencia;
    this.verborrea = 100 - this.carisma;
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
