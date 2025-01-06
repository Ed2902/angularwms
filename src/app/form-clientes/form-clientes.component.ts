import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-clientes',
  standalone: false,
  
  templateUrl: './form-clientes.component.html',
  styleUrl: './form-clientes.component.css'
})

export class FormClientesComponent implements OnInit {
  clienteForm: FormGroup;
  fechaActual: string;

  constructor(private fb: FormBuilder) {
    this.clienteForm = this.fb.group({
      id_cliente: ['', [Validators.required, Validators.maxLength(50)]],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      representantelegal: ['', [Validators.required, Validators.maxLength(50)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      direccion: ['', [Validators.required, Validators.maxLength(100)]],
      // Los campos de archivos no necesitan validación para este caso
    });

    const hoy = new Date();
    this.fechaActual = hoy.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.clienteForm.valid) {
      const formData = this.clienteForm.value;
      console.log('Formulario válido:', formData);
      // Aquí puedes agregar la lógica para enviar los datos al servidor o procesarlos
    } else {
      console.log('Formulario inválido');
      this.marcarCamposInvalidos();
    }
  }

  onFileChange(event: Event, fieldName: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log(`Archivo cargado en ${fieldName}:`, file.name);
      // Aquí puedes procesar el archivo según sea necesario
    }
  }

  private marcarCamposInvalidos(): void {
    Object.keys(this.clienteForm.controls).forEach((campo) => {
      const control = this.clienteForm.get(campo);
      if (control && control.invalid) {
        control.markAsTouched();
      }
    });
  }

  esCampoInvalido(campo: string): boolean {
    const control = this.clienteForm.get(campo);
    return control ? control.invalid && control.touched : false;
  }
}