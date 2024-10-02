import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamProductComponent } from './exam-product.component';

describe('ExamProductComponent', () => {
  let component: ExamProductComponent;
  let fixture: ComponentFixture<ExamProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
