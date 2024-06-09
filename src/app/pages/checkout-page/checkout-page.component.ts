import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CheckoutFormComponent } from '../../components/checkout-form/checkout-form.component';
import { OrderSummaryComponent } from '../../components/order-summary/order-summary.component';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CheckoutFormComponent, OrderSummaryComponent],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent {
  isConfirmBtnClicked: boolean;

  onConfirBtnClick(ConfirmBtnClicked: boolean){
    this.isConfirmBtnClicked = ConfirmBtnClicked;
    console.log(this.isConfirmBtnClicked);
  }

}
