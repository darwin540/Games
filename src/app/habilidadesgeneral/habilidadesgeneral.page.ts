import { Component, OnInit } from '@angular/core';
import { HabilidadesService } from '../servicios/habilidades.service';

@Component({
  selector: 'app-habilidadesgeneral',
  templateUrl: './habilidadesgeneral.page.html',
  styleUrls: ['./habilidadesgeneral.page.scss'],
})
export class HabilidadesgeneralPage implements OnInit {

  habilidades: any = {}; // Almacena las habilidades obtenidas del backend

  constructor(private habilidadesService: HabilidadesService) { }

  ngOnInit() {
    this.loadHabilidades();
  }

  loadHabilidades() {
    this.habilidadesService.getHabilidades().subscribe(
      (response: any) => {
        this.habilidades = response.habilidad; // Asegúrate de que el JSON coincida con tu API
      },
      (error) => {
        console.error('Error al obtener las habilidades:', error);
      }
    );
  }
}
