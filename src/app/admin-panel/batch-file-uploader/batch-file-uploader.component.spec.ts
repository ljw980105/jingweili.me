import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchFileUploaderComponent } from './batch-file-uploader.component';

describe('BatchFileUploaderComponent', () => {
  let component: BatchFileUploaderComponent;
  let fixture: ComponentFixture<BatchFileUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchFileUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchFileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
