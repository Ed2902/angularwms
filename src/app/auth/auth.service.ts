import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/auth'; // URL de tu backend
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  // Obtener el token desde localStorage
  getToken(): string | null {
    return localStorage.getItem('token'); // Devuelve el token o null si no existe
  }

  // Verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    const token = this.getToken();
  
    // Si no hay token, no está autenticado
    if (!token) {
      console.log('No token found in localStorage.');
      return false;
    }
  
    try {
      // Decodificar el payload del token
      const payload = JSON.parse(atob(token.split('.')[1]));
  
      // Validar que el payload tenga la propiedad 'exp'
      if (!payload.exp) {
        console.error('El token no tiene el campo exp.');
        return false;
      }
  
      // Obtener el tiempo actual en segundos
      const currentTime = Math.floor(Date.now() / 1000);
  
      // Verificar si el token ha expirado
      const isTokenValid = payload.exp > currentTime;
      console.log('Token válido:', isTokenValid);
  
      return isTokenValid;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return false; // Token inválido
    }
  }
  

  // Método para iniciar sesión
  login(credentials: { name_user: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((response: any) => {
        this.saveToken(response.token);
        this.isAuthenticatedSubject.next(true); // Actualizar estado de autenticación
        this.router.navigate(['/dashboard']); // Redirigir tras login exitoso
      })
    );
  }

  // Guardar el token en LocalStorage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
    console.log('Token guardado en localStorage.');
  }

  getUserInfo(): { id_usuario: string; name_user: string } | null {
    const token = this.getToken(); // Recupera el token desde localStorage
    if (!token) {
      return null; // Si no hay token, no hay usuario
    }
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el payload
      return { id_usuario: payload.id_usuario, name_user: payload.name_user };
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null; // En caso de error, retorna null
    }
  }


  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('token'); // Eliminar el token
    this.isAuthenticatedSubject.next(false); // Actualizar estado de autenticación
    this.router.navigate(['/auth/login']); // Redirigir al login
  }
}
