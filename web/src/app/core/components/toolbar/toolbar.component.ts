import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'core-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output() openMenu = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
