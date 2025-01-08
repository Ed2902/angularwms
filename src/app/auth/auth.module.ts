import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms'; // Para manejar formularios

@NgModule({
  declarations: [LoginComponent], // Declarar el componente Login
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule, // Importar FormsModule para usar ngModel
  ],
})
export class AuthModule {}
