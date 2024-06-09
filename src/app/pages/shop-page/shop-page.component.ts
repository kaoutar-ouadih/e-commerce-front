import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ProductsComponent } from '../../components/products/products.component';

@Component({
  selector: 'app-shop-page',
  standalone: true,
  imports: [SidebarComponent, ProductsComponent],
  templateUrl: './shop-page.component.html',
  styleUrl: './shop-page.component.css'
})
export class ShopPageComponent {

}
