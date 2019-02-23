import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
  // selector    — 组件的选择器（CSS 元素选择器）
  // templateUrl — 组件模板文件的位置。
  // styleUrls   — 组件私有 CSS 样式表文件的位置。
})
export class HeroesComponent implements OnInit {
  hero: Hero = {
    id: 1,
    name:'Windstorm'
  };
  heroes: Hero[];

  // selectedHero : Hero;
  // onSelect(hero : Hero): void{
    // this.selectedHero = hero;
  // };

  constructor(private heroService: HeroService) { //标记为一个 HeroService 的注入点

  }

  getHeroes(): void{
    this.heroService.getHeroes().subscribe(  // 订阅服务
      heroes => this.heroes = heroes
    );
    
  };

  ngOnInit() {
    this.getHeroes();
  }

  add(name: string): void{
    name = name.trim();
    if(!name)return;
    this.heroService.addHero({name} as Hero).subscribe(
      hero => {
        this.heroes.push(hero);
      }
    )
  }

  delete(hero: Hero):void{
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
