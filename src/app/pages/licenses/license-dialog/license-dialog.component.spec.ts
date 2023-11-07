import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseDialogComponent } from './license-dialog.component';

describe('LicenseDialogComponent', () => {
  let component: LicenseDialogComponent;
  let fixture: ComponentFixture<LicenseDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LicenseDialogComponent]
    });
    fixture = TestBed.createComponent(LicenseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
