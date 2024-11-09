import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignSalaPage } from './assign-sala.page';

describe('AssignSalaPage', () => {
  let component: AssignSalaPage;
  let fixture: ComponentFixture<AssignSalaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignSalaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
