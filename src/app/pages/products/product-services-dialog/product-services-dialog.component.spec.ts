import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductServicesDialogComponent } from './product-services-dialog.component';

describe('ProductServicesDialogComponent', () => {
  let component: ProductServicesDialogComponent;
  let fixture: ComponentFixture<ProductServicesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductServicesDialogComponent]
    });
    fixture = TestBed.createComponent(ProductServicesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
