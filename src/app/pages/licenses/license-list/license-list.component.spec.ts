import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseListComponent } from './license-list.component';

describe('LicenseListComponent', () => {
  let component: LicenseListComponent;
  let fixture: ComponentFixture<LicenseListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LicenseListComponent]
    });
    fixture = TestBed.createComponent(LicenseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
