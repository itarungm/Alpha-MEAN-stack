import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AddPostsComponent } from '../posts/add-posts/add-posts.component';
import { Headerv2Component } from './headerv2/headerv2.component';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, HomepageComponent, RightSidebarComponent, Headerv2Component],
  imports: [
    CommonModule,
    SharedRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  exports:[HeaderComponent,HomepageComponent,FooterComponent,RightSidebarComponent,Headerv2Component]
})
export class SharedModule { }
