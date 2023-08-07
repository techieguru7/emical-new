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

import {Chart} from 'chart.js';
import { registerables } from 'chart.js';
import { DecimalPipe } from '@angular/common';
import { ErrorpageComponent } from './errorpage/errorpage.component';
import { CurrencySymbolPipe } from './cuureny-symbaol.pipe';
import { NumberToWordsPipe } from './number-to-word.pipe';
Chart.register(...registerables);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    EmicalComponent,
    ErrorpageComponent,
    CurrencySymbolPipe,
    NumberToWordsPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    MaterialExampleModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
