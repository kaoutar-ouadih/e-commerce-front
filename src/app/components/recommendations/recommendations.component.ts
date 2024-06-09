import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recommendations.component.html',
  styleUrl: './recommendations.component.css'
})
export class RecommendationsComponent implements OnInit{
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
