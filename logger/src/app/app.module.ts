import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RandomLoggerComponent } from './random-logger/random-logger.component';
import { LogsPageComponent } from './logs-page/logs-page.component';
import { HttpClientModule } from '@angular/common/http';
import { LoggerService } from './logger.service';

@NgModule({
  declarations: [
    AppComponent,
    RandomLoggerComponent,
    LogsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
