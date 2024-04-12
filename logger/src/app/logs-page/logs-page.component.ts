import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-logs-page',
  templateUrl: './logs-page.component.html',
  styleUrls: ['./logs-page.component.css']
})
export class LogsPageComponent implements OnInit {
  logs: string[] = [];

  constructor(private logger: LoggerService, private router: Router) {
    //
  }

  ngOnInit(): void {
    this.logs = this.logger.getLogs();
  }
// --------------------------------------------
  goBack(): void {
    this.router.navigateByUrl('/');
  }
}

