import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-random-logger',
  templateUrl: './random-logger.component.html',
  styleUrls: ['./random-logger.component.css']
})

export class RandomLoggerComponent {
  constructor(private logger: LoggerService, private router: Router) {
    //
  }

  logs: string = '';

  logRandomMessage(): void {
    const messages = [
      'This is a random log message.',
      'Another random log message here.',
      'Logging some random stuff.'
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    const randomMessage = messages[randomIndex];
    this.logger.logError(randomMessage);
  }
// ------------------------------------------------------
  viewLogs(): void {
    this.router.navigateByUrl('/logs');
  }
}