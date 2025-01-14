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
  private userSubject = new BehaviorSubject<any>(this.getUserInfoFromLocalStorage()); // Comienza con datos del localStorage
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  user$ = this.userSubject.asObservable(); // Observable para acceder a los datos del usuario

  constructor(private http: HttpClient, private router: Router) {}

  // Obtener el token desde localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Verificar si el usuario está autenticado
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Math.floor(Date.now() / 1000);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return false;
    }
  }

  // Método para iniciar sesión
  login(credentials: { name_user: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((response: any) => {
        this.saveToken(response.token);
        this.saveUserInfo(response.user); // Guardar todos los datos del usuario
        this.isAuthenticatedSubject.next(true);
        this.router.navigate(['/reportes']);
      })
    );
  }

  // Guardar el token en LocalStorage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Guardar la información completa del usuario en LocalStorage y emitirla
  saveUserInfo(user: any): void {
    // Guardamos la información completa del usuario (nombre, correo, foto, etc.)
    const userInfo = {
      id_usuario: user.id_usuario,
      name_user: user.name_user,
      nombre: user.nombre,
      email: user.email,
      cargo: user.cargo,
      foto: user.foto, // Guarda la URL de la foto de perfil
    };

    localStorage.setItem('user', JSON.stringify(userInfo)); // Guardamos la info del usuario en LocalStorage
    this.userSubject.next(userInfo); // Emitimos los datos del usuario al BehaviorSubject
  }

  // Obtener la información del usuario desde LocalStorage
  getUserInfoFromLocalStorage(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null; // Devuelve los datos del usuario si existen en localStorage
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isAuthenticatedSubject.next(false);
    this.userSubject.next(null); // Limpiar la información del usuario
    this.router.navigate(['/auth/login']);
  }
}
