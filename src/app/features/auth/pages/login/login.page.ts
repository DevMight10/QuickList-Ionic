import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonList, IonItem, IonInput, IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonList, IonItem, IonInput, IonButton, IonIcon, CommonModule, FormsModule]
})
export class LoginPage {

  constructor() { }

}
