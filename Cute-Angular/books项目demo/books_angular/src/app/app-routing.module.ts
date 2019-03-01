import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { DetailComponent } from './detail/detail.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  { path: '', redirectTo:'/index', pathMatch:'full' },
  { path: 'index', component: IndexComponent},
  { path: 'detail/:id', component: DetailComponent},
  { path: 'add', component: AddComponent},
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
