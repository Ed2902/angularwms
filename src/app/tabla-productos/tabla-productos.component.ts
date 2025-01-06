import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-tabla-productos',
  standalone: false,
  templateUrl: './tabla-productos.component.html',
  styleUrls: ['./tabla-productos.component.css']
})
export class TablaProductosComponent {
  productos = [
    {
      id_producto: 'P001',
      nombre: 'Producto A',
      referencia: 'REF001',
      tipo: 'Tipo 1',
      cliente: 'Cliente 1',
      fecha_codificacion: '2023-01-01',
      usuario_codifico: 'Usuario 1'
    },
    // Agrega más datos aquí
  ];

  searchTerm: string = '';
  criterioOrdenamiento: string = '';
  ordenAscendente: boolean = true;

  // Filtrar productos según búsqueda
  filteredProductos() {
    return this.productos
      .filter((producto) =>
        Object.values(producto).some((value) =>
          value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      )
      .sort((a, b) => this.comparar(a, b));
  }

  comparar(a: any, b: any): number {
    if (!this.criterioOrdenamiento) return 0;

    const valorA = a[this.criterioOrdenamiento as keyof typeof a];
    const valorB = b[this.criterioOrdenamiento as keyof typeof b];

    if (typeof valorA === 'string' && typeof valorB === 'string') {
      return this.ordenAscendente
        ? valorA.localeCompare(valorB)
        : valorB.localeCompare(valorA);
    }

    if (typeof valorA === 'number' && typeof valorB === 'number') {
      return this.ordenAscendente ? valorA - valorB : valorB - valorA;
    }

    return 0;
  }

  ordenarPor(campo: string): void {
    if (this.criterioOrdenamiento === campo) {
      this.ordenAscendente = !this.ordenAscendente;
    } else {
      this.criterioOrdenamiento = campo;
      this.ordenAscendente = true;
    }
  }

  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.productos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Productos');
    XLSX.writeFile(workbook, 'Productos.xlsx');
  }

 
}
