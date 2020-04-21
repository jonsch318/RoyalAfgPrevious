import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGridItemComponent } from './select-grid-item.component';

describe('SelectGridItemComponent', () => {
  let component: SelectGridItemComponent;
  let fixture: ComponentFixture<SelectGridItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectGridItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
