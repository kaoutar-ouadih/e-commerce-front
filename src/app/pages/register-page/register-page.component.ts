import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../../services/user-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {
  user : User = new User();
  isSubmited : boolean = false;
  constructor(private userService: UserServiceService, private router: Router){

  }

  onSubmit(myForm){
    this.isSubmited = true;
    if(myForm.form.valid && this.user.confirmPassword== this.user.password){
      //call the api for registering the user 
      this.userService.addUser(myForm.value).subscribe(
        (response) => {
          this.router.navigateByUrl('/login');
        },
        (error) => {
          console.error('Error:', error);
        }
      );
      
    }
  }
}
