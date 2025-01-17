import { Component, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductServiceService } from '../../services/product-service.service';
import { Product } from '../../models/product';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { BehaviorService } from '../../services/behavior.service';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, HttpClientModule, CommonModule, PaginationComponent
    
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit{
products : Product[] = [];
//for filters
categoriesFilter : string[] = [];
filtredProducts : Product[];
//for price range filtering
productsInRange: Product[];
minPrice: number;
maxPrice: number;
//for sorting
sortingParameter : string = '';
sortingOrder : string = 'desc';
//for pagination
currentPage : number = 1;
productsPerPage : number = 9;
paginatedProducts : Product[];
//for search bar
searchKeyword: string ='';
searchResult: Product[];

constructor(private productService : ProductServiceService, private behaviorService : BehaviorService){
}
ngOnInit(): void {
  this.getAllProducts();
  this.behaviorService.getFilterCategories().subscribe(
    result => {
      this.categoriesFilter = result;
      this.filtredProducts = this.filter(this.categoriesFilter);
      //to combine with search
      this.searchResult = this.filtredProducts;
      this.searchFilter();
      this.productsInRange =this.filtredProducts;
      this.priceFilteringData();
      //to combince with pagination
      this.paginateData();
      //to combine sorting and filtering
      this.behaviorService.getSortingParameter().subscribe(
        result=>{
          this.sortingParameter = result;
          this.sortData(this.sortingParameter, this.sortingOrder);
          this.paginateData();
        }
      )
      this.behaviorService.getSortingOrder().subscribe(
        result=>{
          this.sortingOrder = result;
          this.sortData(this.sortingParameter, this.sortingOrder);
          this.paginateData();
        }
      )

    }
  );
  this.behaviorService.getSortingParameter().subscribe(
    result=>{
      this.sortingParameter = result;
      this.sortData(this.sortingParameter, this.sortingOrder);
      this.paginateData();
    }
  ) 
  this.behaviorService.getSortingOrder().subscribe(
    result=>{
      this.sortingOrder = result;
      this.sortData(this.sortingParameter, this.sortingOrder);
      this.paginateData();
    }
  )
  //for price range 
  this.behaviorService.getMinPriceFilter().subscribe(
    result=>{
      this.minPrice = result;
      this.priceFilteringData();
      this.behaviorService.getSortingParameter().subscribe(
        result=>{
          this.sortingParameter = result;
          this.sortData(this.sortingParameter, this.sortingOrder);
          this.paginateData();
        }
      ) 
    }
  )
  this.behaviorService.getMaxPriceFilter().subscribe(
    result=>{
      this.maxPrice = result;
      this.priceFilteringData();
      this.behaviorService.getSortingParameter().subscribe(
        result=>{
          this.sortingParameter = result;
          this.sortData(this.sortingParameter, this.sortingOrder);
          this.paginateData();
        }
      ) 
    }
  )

  //for search bar
  this.behaviorService.getSearchKeyword().subscribe(
    result=>{
      this.searchKeyword = result;
      console.log(this.searchKeyword);
      this.searchFilter();
    }
  )
 
}

getAllProducts(){
  this.productService.getAllProducts().subscribe(
    res=>{
      this.products = res;
      this.filtredProducts = res;
      this.searchResult = res;
      this.productsInRange = res;
      this.searchFilter();
      this.paginateData();

    },
    error=>{
      console.log(error);
  })
}

filter(filter : string[]): Product[] {
  if(filter.length == 0){
    return this.products;
  }
  else if(this.products != null){
    return this.products.filter(item => filter.includes(item.category.name));
  }
}

sortData(parameter : string, order : string){
 if(parameter == ''){
  // this.filtredProducts ;
  this.productsInRange ;
 }
 else if (this.productsInRange != null && order == 'desc'){
  if(parameter == 'addedAt'){
    this.productsInRange.sort((a, b)=> new Date(b[parameter]).getDate() - new Date(a[parameter]).getDate());
  }else{
    this.productsInRange.sort((a, b)=> b[parameter] - a[parameter]);
  }
 }
 else if(this.productsInRange  != null && order == 'asc'){
  if(parameter == 'addedAt'){
    this.productsInRange.sort((a, b)=> new Date(a[parameter]).getDate() - new Date(b[parameter]).getDate() );
  }else{
    this.productsInRange.sort((a, b)=> a[parameter] - b[parameter]);
  }
 }
}

//pagination
onPageClick(page : number){
  this.currentPage =page;
  this.paginateData();
}

paginateData(){
  let start = (this.currentPage - 1) * this.productsPerPage;
  let end = this.currentPage * this.productsPerPage;
  // this.paginatedProducts = this.filtredProducts?.slice(start, end);
  this.paginatedProducts = this.productsInRange?.slice(start, end);
}

//for cart management
addToCart(product: Product, quantity: number){
  this.behaviorService.addToCart(product, quantity); 
}

priceFilteringData(){
 this.productsInRange = this.searchResult.filter((item)=> item.currentPrice< this.maxPrice && item.currentPrice> this.minPrice);
//  console.log("products in range", this.productsInRange);
 this.paginateData();
}

//for search bar
searchFilter(){
  if(this.searchKeyword == ''){
    this.searchResult = this.filtredProducts;
    this.priceFilteringData();
  }else{
    this.searchResult = this.filtredProducts.filter((item)=> item.name.includes(this.searchKeyword));
    this.priceFilteringData();
    console.log(this.searchResult);
  } 
}

}
