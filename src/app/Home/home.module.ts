import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from '../Home/Component/home.component';
import { ContactComponent } from '../Home/Component/contact.component';
import { HomeRoutingModule } from '../Home/home-routing.module';
import { AboutComponent } from '../Home/Component/about.component';


@NgModule({
  declarations: [
    AboutComponent,
    HomeComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
