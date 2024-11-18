import { Component, OnInit, ViewChild } from '@angular/core';
import { HabilidadesService } from '../servicios/habilidades.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-personaje',
  templateUrl: './info-personaje.page.html',
  styleUrls: ['./info-personaje.page.scss'],
})
export class InfoPersonajePage implements OnInit {
  @ViewChild('fileInput') fileInput: any;
  imageSrc: string = 'assets/personajes/image.webp';

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

  constructor(private habilidadesService: HabilidadesService,  private router: Router,) {}

  ngOnInit() {
    this.loadPlayerData();
    this.loadFriends();
  }

  /**
   * Método para seleccionar una imagen local
   */
  selectImage() {
    this.fileInput.nativeElement.click();
  }

  /**
   * Método para manejar la selección de un archivo local
   */
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

  /**
   * Método para enviar los datos de las habilidades al backend
   */
  saveHabilidades() {
    const habilidades = {
      fuerza: this.fuerza,
      estamina: this.estamina,
      balance: this.balance,
      resistencia: this.resistencia,
      conocimiento: this.conocimiento,
      destreza: this.destreza,
      f_voluntad: this.Fvoluntad, // Cambiado a snake_case
      carisma: this.carisma,
      construccion: this.construccion,
      musculatura: this.musculatura,
      punteria: this.punteria,
      inteligencia: this.inteligencia,
      salud: this.salud,
      logica: this.logica,
      sabiduria: this.sabiduria,
      intuicion: this.intuicion,
      verborrea: this.verborrea,
      apariencia: this.apariencia,
    };
  
    this.habilidadesService.saveHabilidades(habilidades).subscribe(
      (response) => {
        console.log('Habilidades guardadas con éxito:', response);
        this.router.navigate(['/habilidades']);
      },
      
      (error) => {
        console.error('Error al guardar las habilidades:', error);
      }
    );
  }
  

  /**
   * Método para cargar la información del jugador desde el localStorage
   */
  loadPlayerData() {
    const studentData = localStorage.getItem('student');
    const profileImage = localStorage.getItem('CapacitorStorage.profileImage');

    if (profileImage) {
      this.imageSrc = profileImage; // Usar la imagen en base64 si está disponible
    } else if (studentData) {
      const student = JSON.parse(studentData);
      this.imageSrc = student.profile_picture
        ? student.profile_picture
        : 'assets/default-profile.png';
    } else {
      this.imageSrc = 'assets/default-profile.png';
    }
  }

  /**
   * Método para cargar la lista de amigos desde el servicio
   */
  loadFriends() {
    this.habilidadesService.getHabilidades().subscribe(
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

  /**
   * Método para enviar un mensaje a un amigo
   */
  sendMessage(friend: { name: string }) {
    console.log('Enviar mensaje a:', friend.name);
  }

  /**
   * Método para eliminar un amigo de la lista
   */
  removeFriend(friend: { name: string }) {
    this.friends = this.friends.filter((f) => f.name !== friend.name);
    console.log('Amigo eliminado:', friend.name);
  }

  /**
   * Métodos para calcular atributos dinámicos
   */
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

  /**
   * Método para construir la URL completa de la imagen
   * @param imagePath Ruta de la imagen en el backend
   */
  getImageUrl(imagePath: string): string {
    return `http://127.0.0.1:8000/storage/${imagePath}`;
  }

  /**
   * Métodos para manipular barras de estado (opcional)
   */
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
