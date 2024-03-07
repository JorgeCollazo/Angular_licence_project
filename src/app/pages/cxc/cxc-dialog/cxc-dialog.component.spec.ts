import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CxcDialogComponent } from './cxc-dialog.component';

describe('CxcDialogComponent', () => {
  let component: CxcDialogComponent;
  let fixture: ComponentFixture<CxcDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CxcDialogComponent]
    });
    fixture = TestBed.createComponent(CxcDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
