import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard'; // Guard para proteger rutas

// Componentes del layout principal
import { TablasPestanasComponent } from './tablas-pestanas/tablas-pestanas.component';
import { TablaProductosComponent } from './tabla-productos/tabla-productos.component';
import { TablaProveedoresComponent } from './tabla-proveedores/tabla-proveedores.component';
import { TablaClientesComponent } from './tabla-clientes/tabla-clientes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListaActividadesComponent } from './Componentes_Personal/lista-actividades/lista-actividades.component';
import { SeguimientoComponent } from './Componentes_Personal/seguimiento/seguimiento.component';
import { DetalleActividadComponent } from './Componentes_Personal/detalle-actividad/detalle-actividad.component';
import { HistorialComponent } from './Componentes_Personal/historial/historial.component';



const routes: Routes = [
  // Rutas protegidas con AuthGuard
  { path: 'operaciones', component: TablasPestanasComponent, canActivate: [AuthGuard] },
  { path: 'productos', component: TablaProductosComponent, canActivate: [AuthGuard] },
  { path: 'proveedores', component: TablaProveedoresComponent, canActivate: [AuthGuard] },
  { path: 'clientes', component: TablaClientesComponent, canActivate: [AuthGuard] },
  { path: 'reportes', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'actividades', component: ListaActividadesComponent, canActivate: [AuthGuard] },
  { path: 'seguimiento', component: SeguimientoComponent, canActivate: [AuthGuard] },
  { path: 'lista-actividades', component: ListaActividadesComponent, canActivate: [AuthGuard] },
  { path: 'actividades/detalle/:id', component: DetalleActividadComponent, canActivate: [AuthGuard] },
  { path: 'historial', component: HistorialComponent, canActivate: [AuthGuard] },

  // Ruta para autenticación
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },

  // Redirección de la ruta raíz basada en estado de autenticación
  {
    path: '',
    canActivate: [AuthGuard], // Proteger la redirección según el estado
    children: [
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' }, // Redirigir a reportes si está autenticado
    ],
  },

  // Manejo de rutas no encontradas
  { path: '**', redirectTo: '/auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
