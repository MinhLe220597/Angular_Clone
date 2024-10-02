import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamOrderComponent } from './exam-order.component';

describe('ExamOrderComponent', () => {
  let component: ExamOrderComponent;
  let fixture: ComponentFixture<ExamOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
