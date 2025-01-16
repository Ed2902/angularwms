import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { ProductosService } from './productos.service';  // ✅ Importar el servicio

@Component({
  selector: 'app-tabla-productos',
  standalone: false,
  templateUrl: './tabla-productos.component.html',
  styleUrls: ['./tabla-productos.component.css']
})
export class TablaProductosComponent implements OnInit {
  
  productos: any[] = [];  // ✅ Inicializar como vacío
  searchTerm: string = '';
  criterioOrdenamiento: string = '';
  ordenAscendente: boolean = true;

  constructor(private productosService: ProductosService) {}

  // ✅ Cargar los productos al iniciar el componente
  ngOnInit(): void {
    this.cargarProductos();
  }

  // ✅ Llamar al servicio para obtener productos
  cargarProductos(): void {
    this.productosService.obtenerProductos().subscribe(
      (data) => {
        this.productos = data;
        console.log('Productos cargados:', data);
      },
      (error) => {
        console.error('Error al cargar productos', error);
      }
    );
  }

  // ✅ Filtrar productos según búsqueda
  filteredProductos() {
    return this.productos
      .filter((producto) =>
        Object.values(producto).some((value) =>
          value && value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      )
      .sort((a, b) => this.comparar(a, b));
  }
  

  // ✅ Comparar productos para ordenar
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

  // ✅ Cambiar el criterio de ordenamiento
  ordenarPor(campo: string): void {
    if (this.criterioOrdenamiento === campo) {
      this.ordenAscendente = !this.ordenAscendente;
    } else {
      this.criterioOrdenamiento = campo;
      this.ordenAscendente = true;
    }
  }

  // ✅ Exportar la tabla de productos a Excel
  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.productos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Productos');
    XLSX.writeFile(workbook, 'Productos.xlsx');
  }
}
