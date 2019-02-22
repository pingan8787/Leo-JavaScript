import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [
  //把一个与空路径“完全匹配”的 URL 重定向到路径为 '/dashboard' 的路由
  { path: '', redirectTo:'/dashboard', pathMatch:'full' },
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes), // 监听浏览器地址变化
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
