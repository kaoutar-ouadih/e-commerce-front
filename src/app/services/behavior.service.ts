import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class BehaviorService {
  //for filtering
  filterCategories = new BehaviorSubject<string[]>([]);
  filterCategory = new BehaviorSubject<string>('');
  minPriceFilter = new BehaviorSubject<number>(0);
  maxPriceFilter = new BehaviorSubject<number>(5000);
  //for sorting
  sortingParameter = new BehaviorSubject<string>('');
  sortingOrder = new BehaviorSubject<string>('desc');
  //for local storage and cart management
  storedCartItems = typeof window !== 'undefined' && localStorage.getItem("cartItems");
  initialCartItems = this.storedCartItems ? JSON.parse(this.storedCartItems) : [];
  cartItems = new BehaviorSubject<any[]>(this.initialCartItems);
  //for search bar
  searchKeyword = new BehaviorSubject<string>('');

  constructor() { }
  //for filtering products
  addFilterCategory(filterCategoryName: string): void {
    const currentCategories = this.filterCategories.getValue();
    if (!currentCategories.includes(filterCategoryName)) {
      currentCategories.push(filterCategoryName);
      this.filterCategories.next(currentCategories);
    }
  }

  setFilterCategory(filterCategoryName: string){
    this.filterCategory.next(filterCategoryName);
  }
  removeFilterCategory(filterCategoryName: string): void {
    const currentCategories = this.filterCategories.getValue();
    const index = currentCategories.indexOf(filterCategoryName);
    if (index > -1) {
      currentCategories.splice(index, 1);
      this.filterCategories.next(currentCategories);
    }
  }

  getFilterCategories(): Observable<string[]> {
    return this.filterCategories.asObservable();
  }

  getFilterCategory(): Observable<string> {
    return this.filterCategory.asObservable();
  }
  //for sorting products
  setSortingParameter(parameter : string){
    return this.sortingParameter.next(parameter);
  }

  getSortingParameter():Observable<string>{
    return this.sortingParameter.asObservable();
  }

  setSortingOrder(order : string){
    return this.sortingOrder.next(order);
  }
  
  getSortingOrder(): Observable<string>{
    return this.sortingOrder.asObservable();
  }
  //for cart management
  addToCart(item: Product, quantity: number){
    const currentCartItems = this.cartItems.getValue();
    const existingItemIndex = currentCartItems.findIndex((cartItem)=>cartItem.item.id == item.id);
    if(existingItemIndex > -1){
      currentCartItems[existingItemIndex].quantity = quantity;
      //for local storage
      const cartItemsString = JSON.stringify(currentCartItems);
      localStorage.setItem("cartItems", cartItemsString);
      this.cartItems.next(currentCartItems);
    }else{
      currentCartItems.push({item, quantity});
      //for local storage
      const cartItemsString = JSON.stringify(currentCartItems);
      localStorage.setItem("cartItems", cartItemsString);
      this.cartItems.next(currentCartItems);
    }
  }

  getCartItems(): Observable<any[]>{
    return this.cartItems.asObservable();
  }

  deleteFromCart(id: number){
    const currentCartItems = this.cartItems.getValue();
    const restCartItems = currentCartItems.filter((cartItem)=> cartItem.item.id != id);
    const cartItemsString = JSON.stringify(restCartItems);
    localStorage.setItem("cartItems", cartItemsString);
    this.cartItems.next(restCartItems);
  }

  //for price range filtering
  setMinPriceFilter(value: number){
    this.minPriceFilter.next(value);
  }
  getMinPriceFilter(): Observable<number>{
    return this.minPriceFilter.asObservable();
  }
  setMaxPriceFilter(value: number){
    this.maxPriceFilter.next(value);
  }
  getMaxPriceFilter(): Observable<number>{
    return this.maxPriceFilter.asObservable();
  }

  //for search bar
  setSearchKeyword(value: string){
    this.searchKeyword.next(value);
  }
  getSearchKeyword(): Observable<string>{
    return this.searchKeyword.asObservable();
  }
}
