import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignoutDialogComponent } from './signout.dialog.component';

describe('Signout.DialogComponent', () => {
  let component: SignoutDialogComponent;
  let fixture: ComponentFixture<SignoutDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignoutDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
