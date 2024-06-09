import { Component, ElementRef, Input, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { Contact } from '../../models/contact';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShippingAddress } from '../../models/shipping-address';
import { Payment } from '../../models/payment';
import { Console } from 'console';

@Component({
  selector: 'app-checkout-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout-form.component.html',
  styleUrl: './checkout-form.component.css'
})
export class CheckoutFormComponent {
  contact: Contact = new Contact();
  shippingAddress: ShippingAddress = new ShippingAddress();
  paymentInfo : Payment = new Payment();
  isCheckoutFormSubmited: boolean = false;
  @Input() isConfirmBtnClicked: boolean;
  @ViewChild('phoneInput') phoneInput: ElementRef;


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isConfirmBtnClicked) {
      this.phoneInputFocus();
    }
  }

  phoneInputFocus(){
    if(this.phoneInput){
      this.phoneInput.nativeElement.focus();
    }
  }

  onSubmit(CheckoutForm){
    this.isCheckoutFormSubmited = true;
    if(CheckoutForm.valid){
      console.log(CheckoutForm.value);
    }
  }
}
