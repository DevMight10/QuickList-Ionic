import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly FIXED_USERNAME = 'admin';
  private readonly FIXED_PASSWORD = '123456';
  private _isAuthenticated: boolean = false; // Estado de autenticación

  constructor(private router: Router) { }

  /**
   * Simulates user login.
   * @param username The provided username.
   * @param password The provided password.
   * @returns True if credentials match, false otherwise.
   */
  login(username: string, password: string): boolean {
    if (username === this.FIXED_USERNAME && password === this.FIXED_PASSWORD) {
      console.log('Login successful!');
      this._isAuthenticated = true; // Establecer como autenticado
      return true;
    } else {
      console.log('Login failed: Invalid credentials.');
      this._isAuthenticated = false; // Establecer como no autenticado
      return false;
    }
  }

  /**
   * Checks if the user is authenticated.
   * @returns True if the user is authenticated, false otherwise.
   */
  isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  /**
   * Logs out the user and redirects to the login page.
   */
  logout(): void {
    this._isAuthenticated = false; // Establecer como no autenticado
    this.router.navigate(['/login']); // Redirigir al login
  }
}
