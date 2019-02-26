import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private heroSerive: HeroService
  ) { }

  search(term: string): void{
    // Push a search term into the observable stream.
    this.searchTerms.next(term);
    // 通过调用next(value) 方法往 Observable 中推送一些值，
  }

  ngOnInit() : void{
    this.heroes$ = this.searchTerms.pipe(
      // 在传出最终字符串之前，debounceTime(300) 将会等待，直到新增字符串的事件暂停了 300 毫秒。 你实际发起请求的间隔永远不会小于 300ms。
      debounceTime(300),

      // distinctUntilChanged() 会确保只在过滤条件变化时才发送请求。
      distinctUntilChanged(),

      // switchMap() 会为每个从 debounce 和 distinctUntilChanged 中通过的搜索词调用搜索服务。 它会取消并丢弃以前的搜索可观察对象，只保留最近的。
      switchMap((term: string) => this.heroSerive.searchHeroes(term))
    );
  }
}
