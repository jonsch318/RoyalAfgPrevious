import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarFilledComponent } from './toolbar-filled.component';

describe('ToolbarFilledComponent', () => {
  let component: ToolbarFilledComponent;
  let fixture: ComponentFixture<ToolbarFilledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarFilledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarFilledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
