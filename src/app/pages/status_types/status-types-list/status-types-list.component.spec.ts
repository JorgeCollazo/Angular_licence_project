import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusTypesListComponent } from './status-types-list.component';

describe('StatusTypesListComponent', () => {
  let component: StatusTypesListComponent;
  let fixture: ComponentFixture<StatusTypesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusTypesListComponent]
    });
    fixture = TestBed.createComponent(StatusTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
