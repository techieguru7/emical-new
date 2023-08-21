import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmicalComponent } from './emical/emical.component';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { ArticleComponent } from './article/article.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

const routes: Routes = [
  { path: '', component: EmicalComponent,data: { prerender: true } },
  { path: '*',
    redirectTo: '',
    pathMatch: 'full'
  },
  { path: 'article', component: ArticleComponent,data: { prerender: true } },
  { path: 'contact', component: ContactFormComponent },
  { path: '404', component: ErrorpageComponent },
  { path: '**', component: ErrorpageComponent },
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
