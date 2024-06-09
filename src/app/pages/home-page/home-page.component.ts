import { Component } from '@angular/core';
import { ServicesComponent } from '../../components/services/services.component';
import { StartExploringComponent } from '../../components/start-exploring/start-exploring.component';
import { RecommendationsComponent } from '../../components/recommendations/recommendations.component';
import { BestSellerComponent } from '../../components/best-seller/best-seller.component';
import { BannerComponent } from '../../components/banner/banner.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [ServicesComponent, StartExploringComponent, RecommendationsComponent, BestSellerComponent, BannerComponent, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
