import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-best-seller',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './best-seller.component.html',
  styleUrl: './best-seller.component.css'
})
export class BestSellerComponent implements OnInit{
  activeRoute : ActivatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activeRoute.fragment.subscribe((data)=>{
      if(data){
        this.scrollToSection(data);
      }
    }
    )
  }

  scrollToSection(section:any){
    document.getElementById(section).scrollIntoView();
  }
}
