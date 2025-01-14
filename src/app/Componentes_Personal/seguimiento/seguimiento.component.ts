import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActividadesService } from '../services/actividades.service';

@Component({
  selector: 'app-seguimiento',
  standalone: false,
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit, OnDestroy {
  actividadesEnProgreso: any[] = [];
  actividadesFiltradas: any[] = []; // 🔎 Lista para filtrar
  busqueda: string = '';
  intervalId: any;

  constructor(private actividadesService: ActividadesService) {}

  ngOnInit(): void {
    this.cargarActividadesEnProgreso();

    this.intervalId = setInterval(() => {
      this.actividadesFiltradas = [...this.actividadesFiltradas];
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  cargarActividadesEnProgreso(): void {
    const idUsuario = '1a2b3c4d-5678-9abc-def0-1234567890ab';
    this.actividadesService.obtenerActividadesEnSeguimiento(idUsuario).subscribe(
      (data) => {
        this.actividadesEnProgreso = data;
        this.actividadesFiltradas = data; // Inicializamos la lista filtrada
      },
      (error) => {
        console.error('Error al cargar actividades en progreso:', error);
      }
    );
  }

  // 🔍 Método para filtrar actividades
  filtrarActividades(): void {
    const termino = this.busqueda.toLowerCase().trim();
    this.actividadesFiltradas = this.actividadesEnProgreso.filter(actividad =>
      actividad.nombre_actividad.toLowerCase().includes(termino)
    );
  }

  // 🧹 Método para limpiar la búsqueda
  limpiarBusqueda(): void {
    this.busqueda = '';
    this.actividadesFiltradas = [...this.actividadesEnProgreso];
  }

  calcularTiempo(actividad: any): string {
    if (!actividad.hora_inicio) {
      return 'No iniciado';
    }

    const horaInicio = this.parseHora(actividad.hora_inicio);
    const horaActual = new Date().getTime();

    if (isNaN(horaInicio)) {
      return 'Hora inválida';
    }

    const diferencia = horaActual - horaInicio;
    const minutos = Math.floor(diferencia / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    return `${minutos}m ${segundos}s`;
  }

  parseHora(horaInicio: string): number {
    const [horas, minutos, segundos] = horaInicio.split(':').map(Number);
    const ahora = new Date();
    ahora.setHours(horas, minutos, segundos, 0);
    return ahora.getTime();
  }

  finalizarActividad(actividad: any): void {
    this.actividadesService.finalizarActividad(actividad.id_asignacion).subscribe(
      () => {
        this.actividadesEnProgreso = this.actividadesEnProgreso.filter((a) => a.id_asignacion !== actividad.id_asignacion);
        this.filtrarActividades(); // Actualizar la lista filtrada
      },
      (error) => {
        console.error('Error al finalizar actividad:', error);
      }
    );
  }
}
