import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'core-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input() open = false;

  constructor() { }

  ngOnInit(): void {
  }

}
