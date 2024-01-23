import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioDialogComponent } from './precio-dialog.component';

describe('PrecioDialogComponent', () => {
  let component: PrecioDialogComponent;
  let fixture: ComponentFixture<PrecioDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrecioDialogComponent]
    });
    fixture = TestBed.createComponent(PrecioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
