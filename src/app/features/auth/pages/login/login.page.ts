import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonInput, IonButton, IonToast } from '@ionic/angular/standalone';
import { AppLogoComponent } from '../../../../shared/components/app-logo/app-logo.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonInput, IonButton, CommonModule, AppLogoComponent, IonToast, FormsModule]
})
export class LoginPage {

  username = '';
  password = '';
  isToastOpen = false;
  toastMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  ionViewWillEnter() {
    // Limpiar los campos de usuario y contraseña cada vez que la vista entra
    this.username = '';
    this.password = '';
  }

  async onLogin() {
    if (await this.authService.login(this.username, this.password)) {
      this.router.navigate(['/products']); // Redirigir a la lista de productos 
    } else {
      this.toastMessage = 'Credenciales inválidas. Inténtalo de nuevo.';
      this.isToastOpen = true;
    }
  }

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

}
