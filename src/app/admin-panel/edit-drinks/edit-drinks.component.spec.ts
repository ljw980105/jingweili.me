import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDrinksComponent } from './edit-drinks.component';

describe('EditDrinksComponent', () => {
  let component: EditDrinksComponent;
  let fixture: ComponentFixture<EditDrinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDrinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDrinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
