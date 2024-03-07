import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductServicesListComponent } from './product-services-list.component';

describe('ProductServicesListComponent', () => {
  let component: ProductServicesListComponent;
  let fixture: ComponentFixture<ProductServicesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductServicesListComponent]
    });
    fixture = TestBed.createComponent(ProductServicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
