import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = { name_user: '', password: '' }; // Inicializar las credenciales

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        this.authService.saveToken(response.token); // Guardar el token
        this.router.navigate(['/dashboard']); // Redirigir al dashboard
      },
      (error) => {
        console.error('Error en el inicio de sesión:', error);
      }
    );
  }
}
