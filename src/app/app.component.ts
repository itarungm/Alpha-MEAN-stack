import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Alpha';
  constructor(private router: Router) {}
  isHomeRoute() {
    return this.router.url === '/';
  }
  isPostDetail() {
    return this.router.url === 'posts/:id';
  }

  isPosts() {
    return this.router.url === '/posts';
  }
  isLogin() {
    return this.router.url === '/login';
  }
  isRegister() {
    return this.router.url === '/register';
  }
  isAddPost() {
    return this.router.url === '/add-posts';
  }
  isPostDetails() {
    return this.router.url === '/:id';
  }
  isMyPosts() {
    return this.router.url === '/my-posts';
  }
  isPostStat() {
    return this.router.url === '/poststat';
  }
}
