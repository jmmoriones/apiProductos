import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './components/product/product.component'
import { HomeComponent } from './components/home/home.component'

const routes: Routes = [
  {
    path: 'product/:id',
    component: ProductComponent
  },
  {
    path: 'users',
    component: HomeComponent
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
