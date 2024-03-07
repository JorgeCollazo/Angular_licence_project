import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseTypeDialogComponent } from './license-type-dialog.component';

describe('LicenseTypeDialogComponent', () => {
  let component: LicenseTypeDialogComponent;
  let fixture: ComponentFixture<LicenseTypeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LicenseTypeDialogComponent]
    });
    fixture = TestBed.createComponent(LicenseTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
