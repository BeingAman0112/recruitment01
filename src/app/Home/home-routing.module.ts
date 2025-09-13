import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../Home/Component/about.component';
import { ContactComponent } from '../Home/Component/contact.component';
import { HomeComponent } from '../Home/Component/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'About', component: AboutComponent },
  { path: 'Contact', component: ContactComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
