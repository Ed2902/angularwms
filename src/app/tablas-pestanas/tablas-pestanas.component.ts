import { Component } from '@angular/core';

@Component({
  selector: 'app-tablas-pestanas',
  standalone: false,
  
  templateUrl: './tablas-pestanas.component.html',
  styleUrl: './tablas-pestanas.component.css'
})
export class TablasPestanasComponent {
  selectedTab = 0;

  tabs = [
    { label: 'Órdenes de Servicio' },
    { label: 'Instrucciones de Proceso' },
    { label: 'Procesos' }
  ];

  ordenes = [
    { fw: 'FW001', fecha: '2025-01-01', descripcion: 'Descripción 1', estado: 'Activo', cliente: 'Cliente A', proveedor: 'Proveedor A', usuario: 'Usuario 1' },
    { fw: 'FW002', fecha: '2025-01-02', descripcion: 'Descripción 2', estado: 'Pendiente', cliente: 'Cliente B', proveedor: 'Proveedor B', usuario: 'Usuario 2' }
  ];

  instrucciones = [
    { fw: 'FW001', expanded: false, detalles: [
      { instruccion: 'Instr 1', servicio: 'Serv A', fechaEjecucion: '2025-01-03', fechaFinalizacion: '2025-01-05', fechaInicio: '2025-01-03', fechaFin: '2025-01-05', estado: 'Completo', productos: 'Prod 1', personas: 'Personas A' }
    ]},
    { fw: 'FW002', expanded: false, detalles: [
      { instruccion: 'Instr 2', servicio: 'Serv B', fechaEjecucion: '2025-01-06', fechaFinalizacion: '2025-01-08', fechaInicio: '2025-01-06', fechaFin: '2025-01-08', estado: 'Pendiente', productos: 'Prod 2', personas: 'Personas B' }
    ]}
  ];

  procesos = [
    { fw: 'FW001', expanded: false, detalles: [
      { idProducto: 'P001', cantidad: 10, nombreProducto: 'Producto A', estado: 'Disponible' }
    ]},
    { fw: 'FW002', expanded: false, detalles: [
      { idProducto: 'P002', cantidad: 5, nombreProducto: 'Producto B', estado: 'Agotado' }
    ]}
  ];

  selectTab(index: number) {
    this.selectedTab = index;
  }

  toggleAccordion(fw: string) {
    const item = this.instrucciones.find(i => i.fw === fw) || this.procesos.find(p => p.fw === fw);
    if (item) {
      item.expanded = !item.expanded;
    }
  }
}
