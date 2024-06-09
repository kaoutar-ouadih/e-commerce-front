import { Component } from '@angular/core';
import { ContactMessage } from '../../models/contact-message';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css'
})
export class AboutPageComponent {
  contactMessage: ContactMessage = new ContactMessage();
  isFormSubmitted: boolean = false;

  onSubmit(contactForm){
    this.isFormSubmitted = true;
    if(contactForm.valid){
      console.log(contactForm.value);
    }
  }
}
