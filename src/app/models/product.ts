import { Category } from "./category";

export class Product {
    id : number;
    name : string;
    imageUrl : string;
    currentPrice : number;
    oldPrice : number;
    category : Category;
    rating : number;
    size : string;
    addedAt : string;
    description: string;
    reviews: string[];
    material: string;
    colors: string[];
    sales: number;
}
