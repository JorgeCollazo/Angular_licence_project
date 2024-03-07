import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesMenuComponent } from './roles-menu.component';

describe('RolesMenuComponent', () => {
  let component: RolesMenuComponent;
  let fixture: ComponentFixture<RolesMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RolesMenuComponent]
    });
    fixture = TestBed.createComponent(RolesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
