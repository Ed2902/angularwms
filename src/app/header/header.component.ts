import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service'; // Asegúrate de que el path es correcto

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  nombre: string | undefined;
  foto: string | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Suscribirse a user$ para obtener los datos del usuario (nombre, foto, etc.)
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.nombre = user.nombre;  // Extraemos el nombre
        
        // Verificar si la ruta de la foto es relativa y concatenar la URL base del backend
        if (user.foto) {
          this.foto = `http://localhost:3000${user.foto}`;  // Concatenamos la URL completa del backend
        } else {
          this.foto = '/assets/default-avatar.png';  // Si no hay foto, usamos una predeterminada
        }
      }
    });
  }
}
