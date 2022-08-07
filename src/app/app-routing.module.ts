import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { AddPostsComponent } from './posts/add-posts/add-posts.component';
import { PostDetailsComponent } from './posts/post-details/post-details.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { MyPostsComponent } from './posts/my-posts/my-posts.component';
import { DashboardComponent } from './admin-panel/dashboard/dashboard.component';
import { UsersComponent } from './admin-panel/users/users.component';
import { PostsComponent } from './admin-panel/posts/posts.component';
import { AuthGuard } from './guard/auth.guard';



const routes: Routes = [
  
  
  {
    path: 'login', component:LoginComponent
  },
  {
    path: 'register', component:RegisterComponent
  },
  {
    path: 'posts', component: PostListComponent
  },
  {
    path: 'add-posts', component: AddPostsComponent, canActivate:[AuthGuard]
  },
  {
    path: 'my-posts', component: MyPostsComponent, canActivate:[AuthGuard]
  },
  {
    path: 'admin', component:DashboardComponent, canActivate:[AuthGuard]
  },
  {
    path: 'users', component:UsersComponent, canActivate:[AuthGuard]
  },
  {
    path: 'postStat', component:PostsComponent, canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
