import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseTypeListComponent } from './license-type-list.component';

describe('LicenseTypeListComponent', () => {
  let component: LicenseTypeListComponent;
  let fixture: ComponentFixture<LicenseTypeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LicenseTypeListComponent]
    });
    fixture = TestBed.createComponent(LicenseTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
