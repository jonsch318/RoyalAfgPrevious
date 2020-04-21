import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ancestorWhere } from 'tslint';
import { url } from 'inspector';

@Component({
  selector: 'select-grid-item',
  templateUrl: './select-grid-item.component.html',
  styleUrls: ['./select-grid-item.component.scss']
})
export class SelectGridItemComponent implements OnInit{
  _caption: string;
  _gameName: string;
  _imageUrl: string;
  _imagePos = "center";
  _hover: boolean;

  @Input()
  get gameName(): string {return this._gameName;}
  set gameName(value: string ){this._gameName = value;}

  @Input()
  get imageUrl(): string {return this._imageUrl;}
  set imageUrl(value: string ){this._imageUrl = value;}

  @Input()
  get imagePos(): string {return this._imagePos;}
  set imagePos(value: string ){this._imagePos = value;}

  @Input()
  get caption(): string {return this._caption;}
  set caption(value: string ){this._caption = value;}

  constructor(
    private _element: ElementRef<HTMLElement>,
    private _router: Router,
  ) {
  }

  ngOnInit(): void {
    this._element.nativeElement.style.width = "100%";
    this._element.nativeElement.style.height = "100%";

    if(!this._caption)
      this._caption = this._gameName;
  }

  getUrl(){
    return "url(" + this._imageUrl+ ")";
  }

  hover(){
    this._hover = true;
  }

  hoverRemoved(){
    this._hover = false;
  }

  play(){
    this._router.navigate(["games/play"], {queryParams: {
      game: this._gameName
      }}).then();
  }

}
