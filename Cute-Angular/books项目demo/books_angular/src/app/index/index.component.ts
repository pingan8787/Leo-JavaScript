import { Component, OnInit } from '@angular/core';
import { Books } from '../books';
// import { BookList } from '../mock-books';
import { BooksService } from '../books.service';
import { HistoryService } from '../history.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  // books: Books = {
  //   id: 1,
  //   url: 'https://img3.doubanio.com/view/subject/m/public/s29988481.jpg',
  //   title: '像火焰像灰烬',
  //   author: '程姬',
  // }
  books : Books[];
  constructor(
    private booksservice: BooksService,
    private historyservice: HistoryService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getBooks();
  }
  getBooks(): void{
    this.historyservice.add('访问首页书本列表');
    this.booksservice.getBookList()
      .subscribe(books => this.books = books);
  }
  funChange(books, $event){
    this.books = this.books.filter(h => h.id !== books.id);
    console.log('ssssssss')
  }
}
