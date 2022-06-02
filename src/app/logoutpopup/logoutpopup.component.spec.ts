import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutpopupComponent } from './logoutpopup.component';

describe('LogoutpopupComponent', () => {
  let component: LogoutpopupComponent;
  let fixture: ComponentFixture<LogoutpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
