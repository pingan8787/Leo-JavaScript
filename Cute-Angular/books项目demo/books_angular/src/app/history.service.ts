import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  history: string[] = [];

  add(histories: string){
    this.history.push(histories);
  }
  clear(){
    this.history = [];
  }
  constructor() { }
}
