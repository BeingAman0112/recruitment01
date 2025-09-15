import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JobsRoutingModule } from './jobs-routing.module';
import { JobsComponent } from './Component/jobs.component';


@NgModule({
  declarations: [
    JobsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    JobsRoutingModule
  ]
})
export class JobsModule { }
