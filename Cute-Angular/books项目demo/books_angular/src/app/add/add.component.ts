import { Component, OnInit } from '@angular/core';
import { Books } from '../books';
import { BooksService } from '../books.service';
import { HistoryService } from '../history.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  books: Books = {
    id: 0,
    url: '',
    title: '',
    author: ''
  }
  constructor(
    private location: Location,
    private booksservice: BooksService,
    private historyservice: HistoryService
  ) { }

  ngOnInit() {
  }
  add(books: Books): void{
    books.title = books.title.trim();
    books.author = books.author.trim();
    this.booksservice.addBooks(books)
      .subscribe( book => {
        this.historyservice.add(`新增书本${books.title}，id为${books.id}`);
        this.location.back();
      });
  }
}
