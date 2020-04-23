import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'games-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  _cols = 4;

  constructor() {
    this.onResize();
  }

  ngOnInit(): void {
  }

  @HostListener("window:resize", ["$event"])
  onResize(event?){
    const width = window.innerWidth;

    //
    let newCols = Math.ceil((width - 100) / 400);
    if(newCols > 4)
      newCols = 4;

    if(this._cols !== newCols)
      this._cols = newCols;

    console.log("Cols:  " +  this._cols);
  }

}
