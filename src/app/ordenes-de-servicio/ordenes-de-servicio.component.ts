import { Component, OnInit } from '@angular/core';
import { OrdenesDeServicioService } from './ordenes-de-servicio.service';

@Component({
  selector: 'app-ordenes-de-servicio',
  templateUrl: './ordenes-de-servicio.component.html',
  styleUrls: ['./ordenes-de-servicio.component.css'],
  standalone: false
})
export class OrdenesDeServicioComponent implements OnInit {

  ordenes: any[] = [];
  searchTerm: string = '';
  modalDetallesAbierto: boolean = false;
  modalAgregarAbierto: boolean = false;
  ordenSeleccionada: any = null;

  constructor(private ordenesService: OrdenesDeServicioService) {}

  ngOnInit(): void {
    this.cargarOrdenes();  // 🔄 Cargar datos al iniciar
  }

  // 🔍 Cargar órdenes de servicio desde la API
  cargarOrdenes(): void {
    this.ordenesService.obtenerOrdenes().subscribe(
      (data) => {
        this.ordenes = data;
      },
      (error) => {
        console.error('Error al cargar las órdenes de servicio', error);
      }
    );
  }

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
