import { Injectable } from '@angular/core';

@Injectable()
export class PanelSizingService {
  msg: string;
  constructor() { }

  setMsg(m: string): void {
    this.msg = m;
    return;
  }
  printMsg(): void {
    console.log(this.msg ? this.msg : 'No msg has been set');
  }

}
