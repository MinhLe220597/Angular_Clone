import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamCustomerComponent } from './exam-customer.component';

describe('ExamCustomerComponent', () => {
  let component: ExamCustomerComponent;
  let fixture: ComponentFixture<ExamCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamCustomerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
