import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamShopComponent } from './exam-shop.component';

describe('ExamShopComponent', () => {
  let component: ExamShopComponent;
  let fixture: ComponentFixture<ExamShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamShopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
