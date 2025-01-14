import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service'; // Asegúrate de que el path es correcto

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  nombre: string | undefined;
  foto: string | undefined;
  email: string | undefined;

  @Output() toggle = new EventEmitter<boolean>(); // Define el evento para emitir

  menuItems = [
    { name: 'Home', link: '/home', active: false },
    { name: 'Reportes', link: '/reportes', active: false },
    { name: 'Operaciones', link: '/operaciones', active: false },
    { name: 'Productos', link: '/productos', active: false },
    { name: 'Proveedores', link: '/proveedores', active: false },
    { name: 'Clientes', link: '/clientes', active: false },
    { name: 'Bodegas', link: '/bodegas', active: false },
    { name: 'Documentos', link: '/documentos', active: false }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Suscribirse a user$ para obtener los datos del usuario (nombre, foto, email, etc.)
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.nombre = user.nombre;  // Extraemos el nombre
        this.email = user.email;    // Extraemos el correo electrónico
        // Concatenar la URL base si la foto es relativa
        this.foto = user.foto ? `http://localhost:3000${user.foto}` : '/assets/default-avatar.png';  // Foto de usuario o una predeterminada
      }
    });
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.toggle.emit(this.isCollapsed); // Emite el nuevo estado del sidebar
  }

  setActive(item: any) {
    this.menuItems.forEach(menu => (menu.active = false));
    item.Active = true; 
  }

  // Método para cerrar sesión
  logout(): void {
    this.authService.logout(); // Llama al logout del AuthService
  }
}
