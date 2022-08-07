import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostListComponent } from './post-list/post-list.component';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AddPostsComponent } from './add-posts/add-posts.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { MyPostsComponent } from './my-posts/my-posts.component';

@NgModule({
  declarations: [PostDetailsComponent, PostListComponent, CategoriesComponent, DashboardComponent, AddPostsComponent, MyPostsComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    SharedModule,
    AngularEditorModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule
  ],
  exports:[PostDetailsComponent,PostListComponent,AddPostsComponent,MyPostsComponent]
})
export class PostsModule { }
