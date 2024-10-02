import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamShopAddComponent } from './exam-shop-add.component';

describe('ExamShopAddComponent', () => {
  let component: ExamShopAddComponent;
  let fixture: ComponentFixture<ExamShopAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamShopAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamShopAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
