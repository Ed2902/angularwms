import { Component, OnInit } from '@angular/core';
import { ActividadesService } from '../services/actividades.service';
 // Importar el servicio

@Component({
  selector: 'app-lista-actividades',
  standalone: false,
  templateUrl: './lista-actividades.component.html',
  styleUrls: ['./lista-actividades.component.css'],
  
})
export class ListaActividadesComponent implements OnInit {
  actividades: any[] = []; // Inicialmente vacío
  modalAbierto = false;
  actividadSeleccionada: any = null;

  constructor(private actividadesService: ActividadesService) {}

  ngOnInit(): void {
    this.cargarActividades(); // Cargar actividades al inicializar el componente
  }

  // Método para cargar actividades desde el API
  cargarActividades(): void {
    const idUsuario = '1a2b3c4d-5678-9abc-def0-1234567890ab'; // ID ficticio del usuario
    this.actividadesService.obtenerActividades(idUsuario).subscribe(
      (data) => {
        this.actividades = data; // Asignar las actividades obtenidas del API
        console.log('Actividades cargadas:', this.actividades);
      },
      (error) => {
        console.error('Error al cargar actividades:', error);
      }
    );
  }

  abrirModal(actividad: any): void {
    this.modalAbierto = true; // Abre el modal
    this.actividadSeleccionada = actividad; // Asigna la actividad seleccionada
  }
  
  cerrarModal(): void {
    this.modalAbierto = false; // Cierra el modal
    this.actividadSeleccionada = null; // Limpia la actividad seleccionada
  }
  
  iniciarActividad(actividad: any): void {
    this.actividadesService.iniciarActividad(actividad.id_asignacion).subscribe(
      (response) => {
        actividad.estado = 'En Progreso'; // Actualizar el estado localmente
        console.log('Actividad iniciada:', response);
      },
      (error) => {
        console.error('Error al iniciar actividad:', error);
      }
    );
  }
}
