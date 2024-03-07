import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTypesListComponent } from './company-types-list.component';

describe('CompanyTypesListComponent', () => {
  let component: CompanyTypesListComponent;
  let fixture: ComponentFixture<CompanyTypesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyTypesListComponent]
    });
    fixture = TestBed.createComponent(CompanyTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
