import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-recomended-products',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recomended-products.component.html',
  styleUrl: './recomended-products.component.css'
})
export class RecomendedProductsComponent implements OnInit {
  activeRoute : ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
   this.activeRoute.fragment.subscribe( (data)=>{
      if (data) {
        this.scrollToSection(data);
      }
   }
   )
  }

  scrollToSection(section : any){
    document.getElementById(section).scrollIntoView();
  }

}
