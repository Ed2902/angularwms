import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-tabla-proveedores',
  standalone: false,
  
  templateUrl: './tabla-proveedores.component.html',
  styleUrl: './tabla-proveedores.component.css'
})

export class TablaProveedoresComponent {
  proveedores = [
    {
      id_proveedor: 'P001',
      nombre: 'Proveedor A',
      representantelegal: 'Juan Pérez',
      correo: 'juan@example.com',
      telefono: '1234567890',
      direccion: 'Calle Falsa 123',
      fecha_registro: '2023-01-01',
      camara_comercio: 'camara_comercio.pdf',
      rut: 'rut.pdf',
      cc_representante: 'cc_representante.pdf',
      certificacion_comercial: 'cert_comercial.pdf',
      certificacion_bancaria: 'cert_bancaria.pdf',
      circular_170: 'circular_170.pdf',
      acuerdos_seguridad: 'acuerdos_seguridad.pdf',
      estados_financieros: 'estados_financieros.pdf',
      autorizacion_tratamiento_datos: 'aut_tratamiento_datos.pdf',
      visita: 'visita.pdf',
      antecedentes_judiciales: 'antecedentes_judiciales.pdf',
    },
    // Agrega más proveedores aquí
  ];

  searchTerm: string = '';
  criterioOrdenamiento: string = '';
  ordenAscendente: boolean = true;

  filteredProveedores() {
    return this.proveedores.filter((proveedor) => {
      return Object.values(proveedor).some((value) =>
        value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }

  
  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.proveedores);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Proveedores');
    XLSX.writeFile(workbook, 'Proveedores.xlsx');
  }

  getFileIcon(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'bi-file-earmark-pdf text-danger'; // Ícono para PDF
      case 'doc':
      case 'docx':
        return 'bi-file-earmark-word text-primary'; // Ícono para Word
      case 'xls':
      case 'xlsx':
        return 'bi-file-earmark-excel text-success'; // Ícono para Excel
      default:
        return 'bi-file-earmark'; // Ícono genérico para otros archivos
    }
  }
  
}
