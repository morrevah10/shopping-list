import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './root/app.component';
import { HomeComponent } from './pages/home/home.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { ShoppingListComponent } from './pages/shoping-list/shoping-list.component';
import { DateListComponent } from './pages/date-list/date-list.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'todo', component: TodoListComponent },
  { path: 'shopping', component: ShoppingListComponent },
  { path: 'dates', component: DateListComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
