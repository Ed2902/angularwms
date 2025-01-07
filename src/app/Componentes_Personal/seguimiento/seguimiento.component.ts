import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seguimiento',
  standalone: false,
  
  templateUrl: './seguimiento.component.html',
  styleUrl: './seguimiento.component.css'
})
export class SeguimientoComponent implements OnInit {
  actividadesEnProgreso = [
    {
      id: 1,
      nombre: 'Revisar inventario',
      estado: 'En Progreso',
      horaInicio: new Date(), // Simula el inicio ahora
    },
    {
      id: 2,
      nombre: 'Preparar informe mensual',
      estado: 'En Progreso',
      horaInicio: new Date(new Date().getTime() - 600000), // Hace 10 minutos
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  calcularTiempo(actividad: any): string {
    const horaActual = new Date().getTime();
    const horaInicio = new Date(actividad.horaInicio).getTime();
    const diferencia = horaActual - horaInicio;

    const minutos = Math.floor(diferencia / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    return `${minutos}m ${segundos}s`;
  }

  finalizarActividad(actividad: any): void {
    actividad.estado = 'Completado';
    actividad.horaFin = new Date(); // Registra la hora de finalización
    console.log(`Actividad finalizada:`, actividad);
    // Eliminar la actividad de la lista en progreso
    this.actividadesEnProgreso = this.actividadesEnProgreso.filter((a) => a.id !== actividad.id);
  }
}