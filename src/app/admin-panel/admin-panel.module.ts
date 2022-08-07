import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TodoComponent } from './todo/todo.component';
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';



@NgModule({
  declarations: [DashboardComponent, TodoComponent, UsersComponent, PostsComponent],
  imports: [
    CommonModule,
    AdminPanelRoutingModule
  ],
  exports:[
    DashboardComponent,
    UsersComponent,
    PostsComponent
  ]
})
export class AdminPanelModule { }
