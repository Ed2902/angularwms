import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

// Importa HttpClientModule para gestionar solicitudes HTTP
import { HttpClientModule } from '@angular/common/http';

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
    DetalleActividadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, // Ya estaba correctamente importado
    FormsModule, // Ya estaba correctamente importado
    HttpClientModule // Agregado aquí para solicitudes HTTP
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
