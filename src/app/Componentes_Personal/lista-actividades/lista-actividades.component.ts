import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-lista-actividades',
  standalone: false,
  
  templateUrl: './lista-actividades.component.html',
  styleUrl: './lista-actividades.component.css'
})

export class ListaActividadesComponent {
  actividades = [
    {
      id: 1,
      nombre: 'Revisar inventario',
      prioridad: 'Alta',
      estado: 'Pendiente',
      descripcion: 'Revisar todas las existencias del almacén.',
    },
    {
      id: 2,
      nombre: 'Preparar informe mensual',
      prioridad: 'Media',
      estado: 'En Progreso',
      descripcion: 'Generar un informe detallado de ventas y costos.',
    },
  ];

  modalAbierto = false;
  actividadSeleccionada: any = null;

  abrirModal(actividad: any): void {
    this.modalAbierto = true;
    this.actividadSeleccionada = actividad;
  }

  cerrarModal(): void {
    this.modalAbierto = false;
    this.actividadSeleccionada = null;
  }

  iniciarActividad(actividad: any): void {
    actividad.estado = 'En Progreso';
    console.log('Actividad iniciada:', actividad);
  }
}