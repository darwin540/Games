import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignImagePage } from './assign-image.page';

describe('AssignImagePage', () => {
  let component: AssignImagePage;
  let fixture: ComponentFixture<AssignImagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
