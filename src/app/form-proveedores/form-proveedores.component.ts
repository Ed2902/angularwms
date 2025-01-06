import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-proveedores',
  standalone: false,
  
  templateUrl: './form-proveedores.component.html',
  styleUrl: './form-proveedores.component.css'
})

export class FormProveedoresComponent implements OnInit {
  proveedorForm!: FormGroup;
  fechaActual: string;

  constructor(private fb: FormBuilder) {
    const fecha = new Date();
    this.fechaActual = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`;
  }

  ngOnInit(): void {
    this.proveedorForm = this.fb.group({
      id_proveedor: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      representantelegal: ['', [Validators.required]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      direccion: ['', [Validators.required]],
      fecha_registro: [{ value: this.fechaActual, disabled: true }],
    });
  }

  onSubmit(): void {
    if (this.proveedorForm.valid) {
      console.log('Datos del proveedor:', this.proveedorForm.value);
      alert('Proveedor guardado exitosamente.');
      this.proveedorForm.reset();
    } else {
      alert('Por favor, complete todos los campos obligatorios.');
    }
  }

  onFileChange(event: any, controlName: string): void {
    const file = event.target.files[0];
    if (file) {
      this.proveedorForm.patchValue({ [controlName]: file.name });
    }
  }
}
