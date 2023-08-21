import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { EmicalComponent } from './emical/emical.component';
import { MaterialExampleModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
ArticleComponent


import { DecimalPipe } from '@angular/common';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { CurrencySymbolPipe } from './cuureny-symbaol.pipe';

import { NumberToWordsPipe } from './number-to-word.pipe';
import { ArticleComponent } from './article/article.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { HttpClientModule } from '@angular/common/http';
import { ContactFormComponent } from './contact-form/contact-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    EmicalComponent,
    ErrorpageComponent,
    CurrencySymbolPipe,
    NumberToWordsPipe,
    ContactFormComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    MaterialExampleModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleChartsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
