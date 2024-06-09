import { Component, ElementRef } from '@angular/core';
import { BehaviorService } from '../../services/behavior.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  priceGap: number = 500;

  constructor(private behaviorService : BehaviorService){
  }

  updateCategory(categoryRef, categoryName: string){
    if(categoryRef.checked){
      this.behaviorService.addFilterCategory(categoryName);
    }else{
        this.behaviorService.removeFilterCategory(categoryName);
    }
  }

  updateSortingParameters(priceAscRef, parameter : string, order : string = 'desc'){
    if(priceAscRef.checked){
      console.log(order +" "+ parameter);
      this.behaviorService.setSortingParameter(parameter);
      this.behaviorService.setSortingOrder(order);
    }
  }

  showFiltersForMobile(categoriesMobileRef){
    categoriesMobileRef.style.display = (window.getComputedStyle(categoriesMobileRef).display == 'none')? 'block': 'none';
  }

  //for price range
  changeRange(minRangeInput, maxRangeInput, progress, event: Event, maxPriceInput, minPriceInput){
    let minValue = +minRangeInput.value;
    let maxValue = +maxRangeInput.value;
    if(maxValue - minValue < this.priceGap){
      if(event.target === minRangeInput){
        minRangeInput.value = maxValue-this.priceGap;
      }else{
        maxRangeInput.value = minValue + this.priceGap;
      }
    }else{
      //for updation price inputs
      minPriceInput.value = minValue;
      maxPriceInput.value = maxValue;
      //for changing price range
      progress.style.left = (minRangeInput.value / minRangeInput.max)* 100 + "%";
      progress.style.right = (100 - (maxRangeInput.value / maxRangeInput.max)* 100) + "%";
      this.behaviorService.setMinPriceFilter(minValue);
      this.behaviorService.setMaxPriceFilter(maxValue);
    }
}

changePrice(minPriceInput, maxPriceInput, minRangeInput, maxRangeInput, progress, event: Event){
  let minPrice = +minPriceInput.value;
  let maxPrice = +maxPriceInput.value;
  if(maxPrice - minPrice >= this.priceGap){
    if(event.target === minPriceInput){
      minRangeInput.value = minPrice;
      progress.style.left = (minRangeInput.value / minRangeInput.max)* 100 + "%";
      this.behaviorService.setMinPriceFilter(minRangeInput.value);
    }else{
      maxRangeInput.value = maxPrice;
      progress.style.right = (100 - (maxRangeInput.value / maxRangeInput.max)* 100) + "%";
      this.behaviorService.setMaxPriceFilter(maxRangeInput.value);
    }
  }
}

}
