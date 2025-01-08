import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient
import { Observable } from 'rxjs'; // Para manejar los observables

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {
  private apiUrl = 'http://localhost:3000/api/personal'; // Base URL de la API

  constructor(private http: HttpClient) {}

  // Método para obtener actividades asignadas por usuario
  obtenerActividades(idUsuario: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/actividades-asignadas/${idUsuario}`);
  }

  // Método para obtener actividades en seguimiento por usuario
  obtenerActividadesEnSeguimiento(idUsuario: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/actividades-seguimiento/${idUsuario}`);
  }

  // Método para iniciar una actividad
  iniciarActividad(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/actividades-asignadas/${id}/iniciar`, {});
  }

  // Método para finalizar una actividad
  finalizarActividad(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/actividades-asignadas/${id}/terminar`, {});
  }
}
