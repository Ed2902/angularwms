import { Component, OnInit } from '@angular/core';
import { ActividadesService } from '../services/actividades.service';

@Component({
  selector: 'app-lista-actividades',
  standalone: false,
  templateUrl: './lista-actividades.component.html',
  styleUrls: ['./lista-actividades.component.css'],
})
export class ListaActividadesComponent implements OnInit {
  actividades: any[] = [];
  actividadesFiltradas: any[] = [];
  busqueda: string = '';
  modalAbierto = false;
  actividadSeleccionada: any = null;

  constructor(private actividadesService: ActividadesService) {}

  ngOnInit(): void {
    this.cargarActividades();
  }

  cargarActividades(): void {
    const idUsuario = '1a2b3c4d-5678-9abc-def0-1234567890ab';
    this.actividadesService.obtenerActividades(idUsuario).subscribe(
      (data) => {
        this.actividades = data;
        this.actividadesFiltradas = data; // Inicializar el filtro con todas las actividades
      },
      (error) => {
        console.error('Error al cargar actividades:', error);
      }
    );
  }

  filtrarActividades(): void {
    const termino = this.busqueda.toLowerCase().trim();
    this.actividadesFiltradas = this.actividades.filter(actividad =>
      actividad.nombre_actividad.toLowerCase().includes(termino)
    );
  }

  limpiarBusqueda(): void {
    this.busqueda = '';
    this.actividadesFiltradas = [...this.actividades]; // Restablecer la lista completa
  }

  abrirModal(actividad: any): void {
    this.modalAbierto = true;
    this.actividadSeleccionada = actividad;
  }

  cerrarModal(): void {
    this.modalAbierto = false;
    this.actividadSeleccionada = null;
  }

  iniciarActividad(actividad: any): void {
    this.actividadesService.iniciarActividad(actividad.id_asignacion).subscribe(
      (response) => {
        actividad.estado = 'En Progreso';
      },
      (error) => {
        console.error('Error al iniciar actividad:', error);
      }
    );
  }
}
