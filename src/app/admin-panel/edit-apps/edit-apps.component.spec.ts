import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditAppsComponent } from './edit-apps.component';

describe('EditAppsComponent', () => {
  let component: EditAppsComponent;
  let fixture: ComponentFixture<EditAppsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAppsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
