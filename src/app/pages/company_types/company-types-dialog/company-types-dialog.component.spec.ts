import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTypesDialogComponent } from './company-types-dialog.component';

describe('CompanyTypesDialogComponent', () => {
  let component: CompanyTypesDialogComponent;
  let fixture: ComponentFixture<CompanyTypesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyTypesDialogComponent]
    });
    fixture = TestBed.createComponent(CompanyTypesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
