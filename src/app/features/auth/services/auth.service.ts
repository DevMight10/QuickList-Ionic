import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly FIXED_USERNAME = 'admin';
  private readonly FIXED_PASSWORD = '123456';
  private _isAuthenticated: boolean = false; // Estado de autenticación
  private _storage: Storage | null = null;
  private readonly AUTH_STATE_KEY = 'auth_state';

  constructor(private router: Router, private storage: Storage) {
    this.init();
  }

  async init() {
    if (this._storage) {
      return;
    }
    const storage = await this.storage.create();
    this._storage = storage;
    this._isAuthenticated = (await this._storage.get(this.AUTH_STATE_KEY)) || false;
  }

  /**
   * Simulates user login.
   * @param username The provided username.
   * @param password The provided password.
   * @returns True if credentials match, false otherwise.
   */
  async login(username: string, password: string): Promise<boolean> {
    if (username === this.FIXED_USERNAME && password === this.FIXED_PASSWORD) {
      console.log('Login successful!');
      this._isAuthenticated = true; // Establecer como autenticado
      await this._storage?.set(this.AUTH_STATE_KEY, true);
      return true;
    } else {
      console.log('Login failed: Invalid credentials.');
      this._isAuthenticated = false; // Establecer como no autenticado
      await this._storage?.set(this.AUTH_STATE_KEY, false);
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
  async logout(): Promise<void> {
    this._isAuthenticated = false; // Establecer como no autenticado
    await this._storage?.set(this.AUTH_STATE_KEY, false);
    this.router.navigate(['/login']); // Redirigir al login
  }
}
