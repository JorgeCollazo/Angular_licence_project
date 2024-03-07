import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioListComponent } from './precio-list.component';

describe('PrecioListComponent', () => {
  let component: PrecioListComponent;
  let fixture: ComponentFixture<PrecioListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrecioListComponent]
    });
    fixture = TestBed.createComponent(PrecioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
