import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//^ NGRX
import { StoreModule } from '@ngrx/store';
import { qustionsReducer } from './store/questions.reducer';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({count: qustionsReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
