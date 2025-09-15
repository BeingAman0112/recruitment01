import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('../app/Home/home.module').then(m => m.HomeModule) },
  { path: 'jobs', loadChildren: () => import('../app/Jobs/jobs.module').then(m => m.JobsModule) },
  { path: 'admin', loadChildren: () => import('../app/Admin/admin-page.module').then(m => m.AdminPageModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
