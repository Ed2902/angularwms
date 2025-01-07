import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablasPestanasComponent } from './tablas-pestanas/tablas-pestanas.component';
import { TablaProductosComponent } from './tabla-productos/tabla-productos.component';
import { TablaProveedoresComponent } from './tabla-proveedores/tabla-proveedores.component';
import { TablaClientesComponent } from './tabla-clientes/tabla-clientes.component'; // Importa el componente de clientes
import { DashboardComponent } from './dashboard/dashboard.component'; // Importa el componente del Dashboard


const routes: Routes = [
  { path: 'operaciones', component: TablasPestanasComponent },
  { path: 'productos', component: TablaProductosComponent }, // Ruta para productos
  { path: 'proveedores', component: TablaProveedoresComponent }, // Ruta para proveedores
  { path: 'clientes', component: TablaClientesComponent }, // Ruta para clientes
  { path: 'reportes', component: DashboardComponent }, // Ruta para reportes que usa el Dashboard
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
