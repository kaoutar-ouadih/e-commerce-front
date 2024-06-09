import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit{
@Input() numberOfItems : number;
@Input() productsPerPage : number;
@Input() currentPage : number;
@Output() pageClicked : EventEmitter<number> = new EventEmitter<number>();

totalPages : number;
pages : number[];

ngOnInit(): void {
    this.updatePagination();
}
ngOnChanges(changes: SimpleChanges): void {
  if (changes.numberOfItems || changes.productsPerPage) {
    this.updatePagination();
  }
}

updatePagination(): void {
  this.totalPages = Math.ceil(this.numberOfItems / this.productsPerPage);
  this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
}
onPageClick(page : number){
  this.pageClicked.emit(page);
}
prevBtnClick(){
  if(this.currentPage > 1){
    this.currentPage--;
    this.pageClicked.emit(this.currentPage);
  }
}
nextBtnClick(){
  if(this.currentPage < this.totalPages){
  this.currentPage++;
  this.pageClicked.emit(this.currentPage);
  }
}
}
