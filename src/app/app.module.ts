import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './root/app.component';
import { ShoppingListComponent } from './pages/shoping-list/shoping-list.component';
import { ProductFormComponent } from './cmps/product-form/product-form.component';

import { ImageUrlPipe } from './pipes/image-url.pipe';
import { HomeComponent } from './pages/home/home.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { DateListComponent } from './pages/date-list/date-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ProductFormComponent,
    ImageUrlPipe,
    HomeComponent,
    TodoListComponent,
    DateListComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
