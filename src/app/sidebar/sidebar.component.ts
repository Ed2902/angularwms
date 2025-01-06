import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isCollapsed = false;

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

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
    this.toggle.emit(this.isCollapsed); // Emite el nuevo estado del sidebar
  }

  setActive(item: any) {
    this.menuItems.forEach(menu => (menu.active = false));
    item.active = true;
  }
}