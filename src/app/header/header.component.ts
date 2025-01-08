import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userName: string = ''; // Nombre del usuario para mostrar en el header

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const userInfo = this.authService.getUserInfo(); // Obtiene información del usuario
    if (userInfo) {
      this.userName = userInfo.name_user; // Asigna el nombre de usuario
    }
  }
}
