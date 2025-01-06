import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formordenservi',
  standalone: false,
  templateUrl: './formordenservi.component.html',
  styleUrls: ['./formordenservi.component.css']
})
export class FormordenserviComponent implements OnInit {
  ordenForm!: FormGroup;
  fechaActual: string;
  usuarioMock: string = 'UsuarioDemo'; // Usuario mockeado para el inicio de sesión

  constructor(private fb: FormBuilder) {
    const fecha = new Date();
    this.fechaActual = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`;
  }

  ngOnInit(): void {
    this.ordenForm = this.fb.group({
      fw: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      estado: ['Pendiente', [Validators.required]],
      cliente: ['', [Validators.required]],
      proveedor: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.ordenForm.valid) {
      const formData = {
        ...this.ordenForm.value,
        fecha: this.fechaActual,
        usuario: this.usuarioMock
      };
      console.log('Formulario enviado:', formData);
      alert('Orden de servicio registrada correctamente');
      this.ordenForm.reset({ estado: 'Pendiente' });
    } else {
      this.ordenForm.markAllAsTouched(); // Marca todos los campos como "tocados" para mostrar errores
      alert('Por favor complete todos los campos requeridos');
    }
  }
}
