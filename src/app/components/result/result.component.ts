import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  private _interval:any;
  private _tiempo:number;

  constructor() {
      this.tiempo = 0;
  }

  ngOnInit() {

      this.interval = setInterval( () => {
          this.tiempo += 1;
      }, 1000);

  }

  get interval():any{
      return this._interval;
  }

  set interval(interval:any){
      this._interval = interval;
  }

  get tiempo():number{
      return this._tiempo;
  }

  set tiempo(tiempo:number){
      this._tiempo = tiempo;
  }
}
