import { Block } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BehaviorService } from '../../services/behavior.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  cartItemsNumber: number;

  constructor(private behaviourService: BehaviorService, private router: Router){
  }

  ngOnInit(): void {
    this.behaviourService.getCartItems().subscribe(
      result=>{
        this.cartItemsNumber = result.reduce((accumulator,currentItem)=>accumulator + currentItem.quantity, 0);
      }
    );
  }

  onMenuClick(navActionHamburger){
    navActionHamburger.style.display = (window.getComputedStyle(navActionHamburger).display == 'none') ? 'flex' : 'none';
  }

  onSearch(e){
    this.behaviourService.setSearchKeyword(e.target.value.toLowerCase());
  }

  searchBtnClick(){
    this.router.navigateByUrl('/shop');
  }

}
