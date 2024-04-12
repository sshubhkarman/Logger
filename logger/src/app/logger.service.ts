import { Injectable } from '@angular/core';
import { LoggingLevels } from './logging-levels.enum';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class LoggerService {


  private logs: string[] = [];
  private logLevel: LoggingLevels = LoggingLevels.Error;
  constructor(private http: HttpClient) {
    this.initSessionHandler();
  }

  private initSessionHandler(): void {
    window.addEventListener('beforeunload', () => {
      this.exportLogsToBackend();
    })
  }

  setLogLevel(level: LoggingLevels): void {
    this.logLevel = level;
  }


  logInfo(message: string): void {
    this.log(message, LoggingLevels.Info);
  }
// --------------------------------------
  logWarning(message: string): void {
    this.log(message, LoggingLevels.Warning);
  }
// -------------------------------------------
  logError(message: string): void {
    this.log(message, LoggingLevels.Error);
  }
// ------------------------------------------
  private log(message: string, level: LoggingLevels): void {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} -- [${level}] -- ${message}`;

    this.logs.push(logEntry);
    localStorage.setItem('appLogs', JSON.stringify(this.logs));
  }
// --------------------------------------------
  getLogs(): string[] {
    return this.logs;
  }

  private isLogLevelHigherOrEqual(logLevel: string, configLevel: string): boolean {
    // Define the order of logging levels based on your application's requirements
    const levelOrder = ['INFO', 'WARNING', 'ERROR'];
    const logLevelIndex = levelOrder.indexOf(logLevel.toUpperCase());
    const configLevelIndex = levelOrder.indexOf(configLevel.toUpperCase());
    console.log(logLevelIndex, configLevelIndex);
  
    // If either log level or config level is not found in the order array, return false
    if (logLevelIndex === -1 || configLevelIndex === -1) {
      return false;
    }
  
    return logLevelIndex >= configLevelIndex;
  }

  exportLogsToBackend(): void {
    const logs = this.getLogs().filter((log)=>{
      const logLevel = log.split('--')[1].replace('[', '').replace(']', '').trim() as keyof typeof LoggingLevels;
      return this.isLogLevelHigherOrEqual(logLevel, this.logLevel);
    });
    if(logs.length === 0)
      return;
    const dateStamp = new Date().toISOString().slice(0, 10); // Get YYYY-MM-DD format
    const fileName = `logs_${dateStamp}.txt`;

    this.http.post<any>('http://localhost:3000/api/logs', { logs, fileName }).subscribe(
      (response) => {
        console.log('Logs exported to backend:', response);
        this.clearLogs(); // After exporting, clear logs
      },
      (error) => {
        console.error('Error exporting logs:', error);
      }
    );
  }

  clearLogs(): void {
    this.logs = [];
    localStorage.removeItem('appLogs')
  }
}
