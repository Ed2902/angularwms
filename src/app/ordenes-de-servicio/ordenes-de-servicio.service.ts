import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdenesDeServicioService {

  private apiUrl = 'http://localhost:3000/api/ordenes-trabajo';  // URL de la API

  constructor(private http: HttpClient) {}

  // 🔍 Obtener todas las órdenes de servicio
  obtenerOrdenes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  // 🔍 Obtener una orden de servicio por FW
  obtenerOrdenPorFW(fw: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${fw}`);
  }

  // ➕ Crear una nueva orden de servicio
  crearOrden(orden: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, orden);
  }

  // ✏️ Actualizar una orden de servicio existente
  actualizarOrden(fw: string, orden: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${fw}`, orden);
  }

  // ❌ Eliminar una orden de servicio
  eliminarOrden(fw: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${fw}`);
  }
}
