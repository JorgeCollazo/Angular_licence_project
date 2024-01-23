import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsidiariesDialogComponent } from './subsidiaries-dialog.component';

describe('SubsidiariesDialogComponent', () => {
  let component: SubsidiariesDialogComponent;
  let fixture: ComponentFixture<SubsidiariesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubsidiariesDialogComponent]
    });
    fixture = TestBed.createComponent(SubsidiariesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
