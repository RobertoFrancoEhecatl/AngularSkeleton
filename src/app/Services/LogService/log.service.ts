import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Log } from 'src/app/Interfaces/Log';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  url: string = '../../../assets/Json/logs.json';
  logs: Log[] = []

  constructor() { }

  getLogs() {
    return fetch(this.url).then(response => response.json())
  }
}
