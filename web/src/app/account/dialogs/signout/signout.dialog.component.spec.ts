import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Signout.DialogComponent } from './signout.dialog.component';

describe('Signout.DialogComponent', () => {
  let component: Signout.DialogComponent;
  let fixture: ComponentFixture<Signout.DialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Signout.DialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Signout.DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
