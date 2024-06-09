import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  serviceUrl : string;

  constructor(private http : HttpClient) { 
    // http://localhost:8080/products/
    this.serviceUrl = "https://e-commerce-backend-production-1d63.up.railway.app/products/";
  }
  
  getAllProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.serviceUrl + 'all');
  }

  getProduct(id: number):Observable<Product>{
    return this.http.get<Product>(this.serviceUrl + `${id}`);
  }
}
