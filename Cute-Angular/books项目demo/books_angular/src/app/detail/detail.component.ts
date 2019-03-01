import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Books } from '../books';
import { BooksService } from '../books.service';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private booksservice: BooksService,
    private historyservice: HistoryService
  ) { }

  books: Books;
  ngOnInit() {
    this.getDetail()
  }
  getDetail(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.getBooks(id);
  }
  getBooks(id: number): void {
    this.books = this.booksservice.getBook(id);
    this.historyservice.add(`查看书本${this.books.title}，id为${this.books.id}`);
    console.log(this.books)
  }
  save(): void {
    this.booksservice.updateBooks(this.books)
      .subscribe(() => this.goBack());
  }
  goBack(): void {
    this.location.back();
  }
}
