import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule
  ],
  exports:[
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule
  ]
})
export class CoreModule { }
