import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { StudentService } from '../servicios/student.service';

@Component({
  selector: 'app-selfie',
  templateUrl: './selfie.page.html',
  styleUrls: ['./selfie.page.scss'],
})
export class SelfiePage implements OnInit {
  profileImage: string = '';
  friends: any[] = [];
  selectedPlayerId: number | null = null;

  constructor(private studentService: StudentService, private router: Router) {}

  ngOnInit() {
    this.startCamera();
    this.loadSavedImage();
    this.loadFriends();
  }

  // Cargar lista de jugadores (amigos)
  loadFriends() {
    this.studentService.getStudents().subscribe(
      (response) => {
        this.friends = response.students;
      },
      (error) => {
        console.error('Error al cargar amigos:', error);
      }
    );
  }

  // Iniciar la cámara
  startCamera() {
    const video = <HTMLVideoElement>document.getElementById('video');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream: MediaStream) => {
          video.srcObject = stream;
          video.play();
        })
        .catch((err) => console.error('Error al acceder a la cámara: ', err));
    } else {
      console.error('El navegador no soporta getUserMedia');
    }
  }

  // Capturar la foto y detener la cámara
  capturePhoto() {
    const video = <HTMLVideoElement>document.getElementById('video');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (video && context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.profileImage = canvas.toDataURL('image/png');

      Preferences.set({ key: 'profileImage', value: this.profileImage });

      const mediaStream = video.srcObject as MediaStream;
      mediaStream.getTracks().forEach((track) => track.stop());
    } else {
      console.error('No se pudo capturar la foto');
    }
  }

  // Convertir la imagen base64 a un archivo
  dataURLtoFile(dataUrl: string, fileName: string): File {
    const arr = dataUrl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'image/png';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
  }

  // Guardar la imagen de perfil en el servidor para el jugador seleccionado
  saveProfileImage() {
    if (this.selectedPlayerId && this.profileImage) {
      const file = this.dataURLtoFile(this.profileImage, 'profile.png');
      const formData = new FormData();
      formData.append('profile_picture', file);

      this.studentService.uploadProfilePicture(this.selectedPlayerId, formData).subscribe(
        (response) => {
          console.log('Imagen de perfil guardada correctamente:', response);
          this.router.navigate(['/info-personaje']);
          alert('Imagen de perfil asignada correctamente');

        },
        (error) => {
          console.error('Error al asignar la imagen de perfil:', error);
          alert('Error al asignar la imagen de perfil');
        }
      );
    } else {
      alert('Por favor, selecciona un jugador y toma una foto');
    }
  }

  // Cargar la imagen de perfil guardada
  async loadSavedImage() {
    const { value } = await Preferences.get({ key: 'profileImage' });
    if (value) {
      this.profileImage = value;
    }
  }
}
