import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamOrderAddComponent } from './exam-order-add.component';

describe('ExamOrderAddComponent', () => {
  let component: ExamOrderAddComponent;
  let fixture: ComponentFixture<ExamOrderAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamOrderAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamOrderAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
