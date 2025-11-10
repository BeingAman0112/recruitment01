import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminPageRoutingModule } from './admin-page-routing.module';
import { AdminPageComponent } from './Component/admin-page.component';


@NgModule({
  declarations: [
    AdminPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminPageRoutingModule
  ]
})
export class AdminPageModule { }
