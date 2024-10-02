import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamProductAddComponent } from './exam-product-add.component';

describe('ExamShopAddComponent', () => {
  let component: ExamProductAddComponent;
  let fixture: ComponentFixture<ExamProductAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamProductAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamProductAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
