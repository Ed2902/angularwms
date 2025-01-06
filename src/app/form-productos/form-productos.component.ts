import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-productos',
  standalone: false,
  
  templateUrl: './form-productos.component.html',
  styleUrl: './form-productos.component.css'
})

export class FormProductosComponent implements OnInit {
  productoForm!: FormGroup;
  fechaActual: string;
  usuarioMock: string = 'UsuarioDemo'; // Usuario simulado
  clientes = [
    { id: 'C001', nombre: 'Cliente 1' },
    { id: 'C002', nombre: 'Cliente 2' },
    { id: 'C003', nombre: 'Cliente 3' },
  ]; // Lista simulada de clientes

  constructor(private fb: FormBuilder) {
    const fecha = new Date();
    this.fechaActual = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`;
  }

  ngOnInit(): void {
    // Inicializa el formulario con validaciones
    this.productoForm = this.fb.group({
      id_producto: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      referencia: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      clienteFk: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.productoForm.valid) {
      const formData = {
        ...this.productoForm.value,
        fecha: this.fechaActual,
        usuario: this.usuarioMock,
      };
      console.log('Datos guardados:', formData);
      alert('Producto guardado exitosamente.');
      this.productoForm.reset(); // Resetea el formulario después de guardar
    } else {
      alert('Por favor complete todos los campos.');
    }
  }
}