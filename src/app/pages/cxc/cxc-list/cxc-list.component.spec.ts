import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CxcListComponent } from './cxc-list.component';

describe('CxcListComponent', () => {
  let component: CxcListComponent;
  let fixture: ComponentFixture<CxcListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CxcListComponent]
    });
    fixture = TestBed.createComponent(CxcListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
