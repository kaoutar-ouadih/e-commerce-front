import { CommonModule } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { BehaviorService } from '../../services/behavior.service';
import { catchError } from 'rxjs';
import { Product } from '../../models/product';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent implements OnInit{
  cartItems: any ;
  shippingEstimate: number = 5;
  taxEstimate: number = 24.90;
  isConfirmBtnClicked: boolean = false;
  @Output() ConfirmBtnClicked : EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private behaviorService: BehaviorService, private router: Router){
  }

  ngOnInit(): void {
    this.behaviorService.getCartItems().subscribe(
      result=>{
        this.cartItems = result;
      }
    )
  }

  deleteFromCart(cartItemId: number){
    this.behaviorService.deleteFromCart(cartItemId);
  }

  incrementQuantity(item: Product, quantity: number){
    quantity++;
    this.behaviorService.addToCart(item, quantity);
  }
  decrementQuantity(item: Product, quantity: number){
    if(quantity > 1){
      quantity--;
    }
    this.behaviorService.addToCart(item, quantity);
  }

  getSubTotal(){
    return this.cartItems.reduce((accumulator, cartElt)=>accumulator + cartElt.item.currentPrice * cartElt.quantity, 0);
  }

  getTotal(){
    return this.getSubTotal() + this.shippingEstimate + this.taxEstimate;
  }

  onConfirmBtnClick(){
    this.isConfirmBtnClicked = true;
    // Redirect to the login page
    this.router.navigate(['/login']);
    this.ConfirmBtnClicked.emit(this.isConfirmBtnClicked);

  }
}
