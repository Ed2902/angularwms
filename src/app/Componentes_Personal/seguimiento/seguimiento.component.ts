import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActividadesService } from '../services/actividades.service';

@Component({
  selector: 'app-seguimiento',
  standalone: false,
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent implements OnInit, OnDestroy {
  actividadesEnProgreso: any[] = []; // Lista de actividades
  intervalId: any; // Para almacenar el ID del intervalo

  constructor(private actividadesService: ActividadesService) {}

  ngOnInit(): void {
    this.cargarActividadesEnProgreso();

    // Actualizar el tiempo cada segundo
    this.intervalId = setInterval(() => {
      this.actividadesEnProgreso = [...this.actividadesEnProgreso]; // Forzar actualización del componente
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Limpiar el intervalo al destruir el componente
    }
  }

  cargarActividadesEnProgreso(): void {
    const idUsuario = '1a2b3c4d-5678-9abc-def0-1234567890ab'; // ID ficticio del usuario
    this.actividadesService.obtenerActividadesEnSeguimiento(idUsuario).subscribe(
      (data) => {
        this.actividadesEnProgreso = data;
      },
      (error) => {
        console.error('Error al cargar actividades en progreso:', error);
      }
    );
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
      (response) => {
        this.actividadesEnProgreso = this.actividadesEnProgreso.filter((a) => a.id_asignacion !== actividad.id_asignacion);
      },
      (error) => {
        console.error('Error al finalizar actividad:', error);
      }
    );
  }
}
