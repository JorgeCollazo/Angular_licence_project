import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesDialogComponent } from './companies-dialog.component';

describe('CompaniesDialogComponent', () => {
  let component: CompaniesDialogComponent;
  let fixture: ComponentFixture<CompaniesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompaniesDialogComponent]
    });
    fixture = TestBed.createComponent(CompaniesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
