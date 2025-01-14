import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Importa HttpClientModule y HTTP_INTERCEPTORS
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormordenserviComponent } from './formordenservi/formordenservi.component';
import { TablasPestanasComponent } from './tablas-pestanas/tablas-pestanas.component';
import { HeaderComponent } from './header/header.component';
import { TablaProductosComponent } from './tabla-productos/tabla-productos.component';
import { FormProductosComponent } from './form-productos/form-productos.component';
import { TablaProveedoresComponent } from './tabla-proveedores/tabla-proveedores.component';
import { FormProveedoresComponent } from './form-proveedores/form-proveedores.component';
import { TablaClientesComponent } from './tabla-clientes/tabla-clientes.component';
import { FormClientesComponent } from './form-clientes/form-clientes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListaActividadesComponent } from './Componentes_Personal/lista-actividades/lista-actividades.component';
import { SeguimientoComponent } from './Componentes_Personal/seguimiento/seguimiento.component';
import { DetalleActividadComponent } from './Componentes_Personal/detalle-actividad/detalle-actividad.component';
import { HistorialComponent } from './Componentes_Personal/historial/historial.component';

import { AuthInterceptor } from './auth/auth.interceptor';
import { TabsOperacionComponent } from './tabs-operacion/tabs-operacion.component';
import { OrdenesDeServicioComponent } from './ordenes-de-servicio/ordenes-de-servicio.component'; // Importa el interceptor

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FormordenserviComponent,
    TablasPestanasComponent,
    HeaderComponent,
    TablaProductosComponent,
    FormProductosComponent,
    TablaProveedoresComponent,
    FormProveedoresComponent,
    TablaClientesComponent,
    FormClientesComponent,
    DashboardComponent,
    ListaActividadesComponent,
    SeguimientoComponent,
    DetalleActividadComponent,
    HistorialComponent,
    TabsOperacionComponent,
    OrdenesDeServicioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, // Para formularios reactivos
    FormsModule, // Para formularios basados en plantillas
    HttpClientModule, // Para solicitudes HTTP
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true, // Permite agregar múltiples interceptores si es necesario
    },
  ],
  bootstrap: [AppComponent], // Componente principal
})
export class AppModule {}
