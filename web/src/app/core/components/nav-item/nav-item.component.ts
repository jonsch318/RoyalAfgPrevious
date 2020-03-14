import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'core-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent implements OnInit {

  @Input() icon = "";
  @Input() hint = "";
  @Input() routerLink: string | any[] = "/";
  @Output() navigate = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
