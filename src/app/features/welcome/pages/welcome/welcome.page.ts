import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AppLogoComponent } from '../../../../shared/components/app-logo/app-logo.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonButton, 
    IonIcon,        // ← Agregado para el icono en el botón
    CommonModule, 
    FormsModule, 
    AppLogoComponent
  ]
})
export class WelcomePage {
  
  constructor(private router: Router) { }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}