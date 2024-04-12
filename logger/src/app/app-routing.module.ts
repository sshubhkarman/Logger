import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogsPageComponent } from './logs-page/logs-page.component';
import { RandomLoggerComponent } from './random-logger/random-logger.component';

const routes: Routes = [
  { path: '', component: RandomLoggerComponent },
  { path: 'logs', component: LogsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
