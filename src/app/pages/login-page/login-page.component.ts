import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserServiceService } from '../../services/user-service.service';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  user : User = new User();
  isSubmited : boolean = false;
  errorMessage: string;
  constructor(private userService: UserServiceService, private router: Router){

  }

  onSumbit(form){
    this.isSubmited = true;
    if(form.valid){
      console.log(form.value);
      //call the api
      this.userService.login(form.value).subscribe(
        (response: User)=>{
          this.router.navigateByUrl('/checkout');
        },
        (error: HttpErrorResponse)=>{
          this.errorMessage = "Email or Password is incorrect!";
        }
      );

    }
  }

}
