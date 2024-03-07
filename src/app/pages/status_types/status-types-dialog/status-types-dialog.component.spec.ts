import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusTypesDialogComponent } from './status-types-dialog.component';

describe('StatusTypesDialogComponent', () => {
  let component: StatusTypesDialogComponent;
  let fixture: ComponentFixture<StatusTypesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusTypesDialogComponent]
    });
    fixture = TestBed.createComponent(StatusTypesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
