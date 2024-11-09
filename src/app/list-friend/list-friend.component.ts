import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // Importa IonicModule aquí
@Component({
  selector: 'app-list-friend',
  templateUrl: './list-friend.component.html',
  styleUrls: ['./list-friend.component.scss'],
  standalone: true,
  imports: [IonicModule] // Asegúrate de que IonicModule está en el array
})
export class ListFriendComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}
  friends = [
    { name: 'Drako ', level: 0 },
    { name: 'Nombre Jugador', level: 0 },
    { name: 'Nombre Jugador', level: 0 }
  ];

  sendMessage(friend: { name: any; }) {
    console.log('Enviar mensaje a:', friend.name);
  }

  removeFriend(friend: { name: any; }) {
    console.log('Eliminar amigo:', friend.name);
  }


}
