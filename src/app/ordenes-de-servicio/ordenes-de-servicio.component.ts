import { Component } from '@angular/core';

@Component({
  selector: 'app-ordenes-de-servicio',
  templateUrl: './ordenes-de-servicio.component.html',
  styleUrls: ['./ordenes-de-servicio.component.css'],
  standalone: false
})
export class OrdenesDeServicioComponent {
  ordenes: any[] = [
    { fw: 'FW001', fecha: '2024-01-15', descripcion: 'Revisión de equipos', estado: 'Pendiente', cliente: 'Cliente A', proveedor: 'Proveedor X', usuario: 'Usuario 1' }
  ];

  searchTerm: string = '';
  modalDetallesAbierto: boolean = false;
  modalAgregarAbierto: boolean = false;
  ordenSeleccionada: any = null;

  filteredOrdenes(): any[] {
    return this.searchTerm
      ? this.ordenes.filter(orden =>
          Object.values(orden).some(value =>
            String(value).toLowerCase().includes(this.searchTerm.toLowerCase())
          )
        )
      : this.ordenes;
  }

  abrirModalDetalles(orden: any): void {
    this.modalDetallesAbierto = true;
    this.ordenSeleccionada = orden;
  }

  cerrarModalDetalles(): void {
    this.modalDetallesAbierto = false;
  }

  abrirModalAgregar(): void {
    this.modalAgregarAbierto = true;
  }

  cerrarModalAgregar(): void {
    this.modalAgregarAbierto = false;
  }

  editarOrden(orden: any): void {
    console.log('Editar orden:', orden);
  }

  eliminarOrden(orden: any): void {
    console.log('Eliminar orden:', orden);
  }

  exportToExcel(): void {
    console.log('Exportar a Excel');
  }

  ordenarPor(campo: string): void {
    console.log(`Ordenar por: ${campo}`);
  }
}
