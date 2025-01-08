import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detalle-actividad',
  standalone: false,
  templateUrl: './detalle-actividad.component.html',
  styleUrls: ['./detalle-actividad.component.css']
})
export class DetalleActividadComponent {
  @Input() actividad: any; // Recibe la actividad seleccionada desde el componente padre

  volver(): void {
    // Puedes manejar esta lógica desde el componente padre si es necesario
    console.log('Volver presionado');
  }
}
