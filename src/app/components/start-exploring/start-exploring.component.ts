import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-start-exploring',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './start-exploring.component.html',
  styleUrl: './start-exploring.component.css'
})
export class StartExploringComponent implements OnInit{
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
