import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cartOutline, list } from 'ionicons/icons';
import { ProductService } from './features/products/services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(private productService: ProductService) {
    addIcons({ cartOutline, list });
  }

  ngOnInit() {
    this.initializeApp();
  }

  async initializeApp() {
    await this.productService.init();
  }
}
