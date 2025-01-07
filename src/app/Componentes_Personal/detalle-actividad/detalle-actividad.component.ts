import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detalle-actividad',
  standalone: false,
  
  templateUrl: './detalle-actividad.component.html',
  styleUrl: './detalle-actividad.component.css'
})
export class DetalleActividadComponent implements OnInit {
  actividad: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Obtener el ID de la actividad desde la URL
    const actividadId = this.route.snapshot.paramMap.get('id');
    this.cargarActividad(actividadId);
  }

  cargarActividad(id: string | null): void {
    // Simula la carga de datos. Reemplazar con un servicio que consulte al backend.
    const actividadesMock = [
      { id: '1', nombre: 'Revisar inventario', prioridad: 'Alta', estado: 'Pendiente', horaInicio: new Date(), descripcion: 'Revisar todas las existencias.' },
      { id: '2', nombre: 'Preparar informe mensual', prioridad: 'Media', estado: 'En Progreso', horaInicio: new Date(new Date().getTime() - 600000), descripcion: 'Generar informe de ventas y costos.' },
    ];

    this.actividad = actividadesMock.find((act) => act.id === id);
  }

  volver(): void {
    this.router.navigate(['/actividades']);
  }
}