import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Books } from '../books';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  @Input() list: Books;

  @Output()
  change = new EventEmitter()

  constructor(
    private booksservice: BooksService
  ) { }
  ngOnInit() {}
  
  getDetailImage(books){
    alert(`正在查看id为${books.id}的大图！`);
  }

  delete(books: Books): void {
    this.booksservice.deleteBooks(books)
      .subscribe(()=>{
        this.change.emit(books);
      });
  }

}
