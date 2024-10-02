import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamCustomerAddComponent } from './exam-customer-add.component';

describe('ExamCustomerAddComponent', () => {
  let component: ExamCustomerAddComponent;
  let fixture: ComponentFixture<ExamCustomerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamCustomerAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamCustomerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
