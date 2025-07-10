import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly FIXED_USERNAME = 'admin';
  private readonly FIXED_PASSWORD = '123456';

  constructor() { }

  /**
   * Simulates user login.
   * @param username The provided username.
   * @param password The provided password.
   * @returns True if credentials match, false otherwise.
   */
  login(username: string, password: string): boolean {
    if (username === this.FIXED_USERNAME && password === this.FIXED_PASSWORD) {
      console.log('Login successful!');
      return true;
    } else {
      console.log('Login failed: Invalid credentials.');
      return false;
    }
  }
}