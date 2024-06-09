import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../../services/product-service.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { BehaviorService } from '../../services/behavior.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  product: Product;
  quantity: number = 1;
   //for image gallery
   @ViewChild('showingImg') showingImg: ElementRef<HTMLImageElement>;
   currentImgSrc: string;

  constructor(private activeRoute: ActivatedRoute, private productService: ProductServiceService, private behaviorService: BehaviorService){
  }
  ngOnInit(): void {
    let id = this.activeRoute.snapshot.paramMap.get('id');
    if(id){
      this.productService.getProduct(+id).subscribe(
        result=>{
          this.product = result;
          this.currentImgSrc = result.imageUrl;
        },
        error=>{
          console.log(error);
        }
      )
    }
  }

  addToCart(product : Product, quantity: number){
    this.behaviorService.addToCart(product, quantity);
  }

  increment(quantity: number){
    this.quantity++;
  }
  decrement(quantity: number){
    this.quantity--;
  }

  //for image gallery
  changeImage(newUrl: string) {
    this.showingImg.nativeElement.src = newUrl;
    this.currentImgSrc = newUrl;
  }

}
