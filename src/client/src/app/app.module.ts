import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { UsersService } from './model/services/users.service';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component'
import { FilterPipe } from './filter.pipe';
import { LimitPipe } from './limit.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { SinEspacios } from './validators.directive'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FilterPipe,
    LimitPipe,
    ProductComponent,
    SinEspacios
  ],
  imports: [
   ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    CommonModule
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
