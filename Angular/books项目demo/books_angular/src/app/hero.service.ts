import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


// @Injectable把这个类标记为依赖注入系统的参与者之一 注册服务的提供商
@Injectable({
  providedIn: 'root'//单一的、共享的，可以把它注入到任何想要它的类上
})

export class HeroService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService// 注入 MessageService 
    
    ) { 
    
  }
  private heroesUrl = 'api/heroes';
  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
  };
  private handleError<T> (operation = 'opration', result?:T){
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed:${error.message}`);
      return of(result as T);// 返回一个空结果 让程序继续运行
    }
  };
  getHeroes(): Observable<Hero[]>{
    // this.messageService.add('HeroService: fetched heroes!');
    // return of(HEROES);
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero>{
    // this.messageService.add(`HeroService: fetched heroes!id = ${id}`);
    // return of(HEROES.find(hero => hero.id === id));
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero (hero: Hero): Observable<any>{
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id = ${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  };

  addHero (hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero:Hero) => this.log(`added hero w/  id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(hero: Hero): Observable<Hero>{
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap( _ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  };

  searchHeroes(term: string): Observable<Hero[]>{
    //如果没有搜索词，该方法立即返回一个空数组
    if(!term.trim()){
      return of([])
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('serchHeroes', []))
    )
  }
}


// tap操作符会查看 Observable 中的值，使用那些值做一些事情，并且把它们传出来。这种 tap 回调不会改变这些值本身。

// HttpClient.put() 方法接受三个参数
// URL 地址, 要修改的数据（这里就是修改后的英雄）,选项