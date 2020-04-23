import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavFilledComponent } from './sidenav-filled.component';

describe('SidenavFilledComponent', () => {
  let component: SidenavFilledComponent;
  let fixture: ComponentFixture<SidenavFilledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavFilledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavFilledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
