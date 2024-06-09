import { Component, OnInit, inject } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { RecomendedProductsComponent } from '../../components/recomended-products/recomended-products.component';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [ProductComponent, RecomendedProductsComponent, RouterLink],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
}
