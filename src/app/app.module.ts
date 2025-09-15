import { AdminPageModule } from './Admin/admin-page.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './HeaderFooter/Component/header.component';
import { FooterComponent } from './HeaderFooter/Component/footer.component';
import { RouterModule } from '@angular/router';
import { HomeModule } from '../app/Home/home.module';
import { JobsModule } from './Jobs/jobs.module';
import { AdminPageComponent } from './Admin/Component/admin-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,

  ],
  imports: [
    HomeModule,
    JobsModule,
    AdminPageModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
