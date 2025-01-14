import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  credentials = { name_user: '', password: '' }; // Inicializar las credenciales
  returnUrl: string = '/reportes'; // Ruta por defecto

  constructor(
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Recuperar la URL de retorno desde los queryParams (si existe)
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/reportes';
  }

  login(): void {
    this.authService.login(this.credentials).subscribe(
      (response) => {
        this.authService.saveToken(response.token); // Guardar el token
        this.router.navigate([this.returnUrl]); // Redirigir a la ruta original
      },
      (error) => {
        console.error('Error en el inicio de sesión:', error);
      }
    );
  }
}
