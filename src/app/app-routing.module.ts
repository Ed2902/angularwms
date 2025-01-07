import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablasPestanasComponent } from './tablas-pestanas/tablas-pestanas.component';
import { TablaProductosComponent } from './tabla-productos/tabla-productos.component';
import { TablaProveedoresComponent } from './tabla-proveedores/tabla-proveedores.component';
import { TablaClientesComponent } from './tabla-clientes/tabla-clientes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListaActividadesComponent } from './Componentes_Personal/lista-actividades/lista-actividades.component';
import { SeguimientoComponent } from './Componentes_Personal/seguimiento/seguimiento.component';
import { DetalleActividadComponent } from './Componentes_Personal/detalle-actividad/detalle-actividad.component'; // Importa el nuevo componente

const routes: Routes = [
  { path: 'operaciones', component: TablasPestanasComponent },
  { path: 'productos', component: TablaProductosComponent },
  { path: 'proveedores', component: TablaProveedoresComponent },
  { path: 'clientes', component: TablaClientesComponent },
  { path: 'reportes', component: DashboardComponent },
  { path: 'actividades', component: ListaActividadesComponent },
  { path: 'seguimiento', component: SeguimientoComponent },
  { path: 'actividades/detalle/:id', component: DetalleActividadComponent }, // Ruta para el detalle de actividades
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Ruta por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
