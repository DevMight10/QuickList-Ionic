import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-app-logo',
  templateUrl: './app-logo.component.html',
  styleUrls: ['./app-logo.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class AppLogoComponent {

  constructor() { }

}
