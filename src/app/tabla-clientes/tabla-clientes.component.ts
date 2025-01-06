import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-tabla-clientes',
  standalone: false,
  
  templateUrl: './tabla-clientes.component.html',
  styleUrl: './tabla-clientes.component.css'
})

export class TablaClientesComponent {
  clientes = [
    {
      id_cliente: 'C001',
      nombre: 'Cliente A',
      representantelegal: 'Juan Pérez',
      correo: 'juan@example.com',
      telefono: '123456789',
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
  ];

  searchTerm: string = '';

  filteredClientes() {
    return this.clientes.filter((cliente) =>
      Object.values(cliente).some((value) =>
        value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }

  getFileIcon(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'bi-file-earmark-pdf';
      case 'doc':
      case 'docx':
        return 'bi-file-earmark-word';
      case 'xls':
      case 'xlsx':
        return 'bi-file-earmark-excel';
      default:
        return 'bi-file-earmark';
    }
  }

  exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.clientes);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Clientes');
    XLSX.writeFile(workbook, 'Clientes.xlsx');
  }
}