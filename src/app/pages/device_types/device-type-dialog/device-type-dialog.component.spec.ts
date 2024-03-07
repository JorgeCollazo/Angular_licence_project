import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTypeDialogComponent } from './device-type-dialog.component';

describe('DeviceTypeDialogComponent', () => {
  let component: DeviceTypeDialogComponent;
  let fixture: ComponentFixture<DeviceTypeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceTypeDialogComponent]
    });
    fixture = TestBed.createComponent(DeviceTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
