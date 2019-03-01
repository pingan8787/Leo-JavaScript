import { Injectable } from '@angular/core';
import { Books } from './books';
import { BookList } from './mock-books';
import { Observable, of } from 'rxjs';
import { HistoryService } from './history.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Options } from 'selenium-webdriver/chrome';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
@Injectable({
  providedIn: 'root'
})
export class BooksService {
  constructor(
    private historyservice: HistoryService,
    private http: HttpClient
  ) { }
  private log(histories: string){
    this.historyservice.add(`正在执行：${histories}`)
  }
  private booksUrl = 'api/books'; // 提供一个API供调用
  // 获取书本列表
  getBookList(): Observable<Books[]> {
    return this.http.get<Books[]>(this.booksUrl)
      .pipe(
        tap( _ => this.log('请求书本数据')),
        catchError(this.handleError<Books[]>('getHeroes', []))
      );
  }
  // 获取指定id的书本
  getBook(id: number): Books{
    return BookList.find(book => book.id === id)
  }
  // 获取指定id的书本
  getBooks(id: number): Observable<Books>{
    const url = `${this.booksUrl}/${id}`;
    return this.http.get<Books>(url).pipe(
      tap( _ => this.log(`请求书本的id为${id}`)),
      catchError(this.handleError<Books>(`getBooks请求是id为${id}`))
    )
  }
  // 更新书本数据
  updateBooks(books: Books): Observable<any>{
    return this.http.put(this.booksUrl, books, httpOptions).pipe(
      tap(_ => this.log(`修改书本的id是${books.id}`)),
      catchError(this.handleError<Books>(`getBooks请求是id为${books.id}`))
    )
  }
  // 添加书本
  addBooks(books: Books): Observable<Books>{
    return this.http.post<Books>(this.booksUrl, books, httpOptions).pipe(
      tap((newBook: Books) => this.log(`新增书本的id为${newBook.id}`)),
      catchError(this.handleError<Books>('添加新书'))
    );
  }
  // 删除书本
  deleteBooks(books: Books): Observable<Books>{
    const id = books.id;
    const url = `${this.booksUrl}/${id}`;
    return this.http.delete<Books>(url, httpOptions).pipe(
      tap(_ => this.log(`删除书本${books.title}，id为${books.id}`)),
      catchError(this.handleError<Books>('删除书本'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} 失败: ${error.message}`); // 发出错误通知
      return of(result as T); // 返回空结果避免程序出错
    };
  }
}
