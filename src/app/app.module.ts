import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importar FormsModule y ReactiveFormsModule
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
    FormClientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, // Agregar ReactiveFormsModule aquí
    FormsModule // Agregar FormsModule aquí
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
