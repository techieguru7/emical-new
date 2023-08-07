import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmicalComponent } from './emical/emical.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';

const routes: Routes = [
  { path: '', component: EmicalComponent },
  { path: '*',
    redirectTo: '',
    pathMatch: 'full'
  },
  //{ path: '**', component: EmicalComponent },
  { path: '**', component: ErrorpageComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
