import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Shop } from 'src/app/models/main-models/shop';
import { ShopServices } from 'src/app/services/main-services/shopApi.services';
import { MyValidators } from 'src/app/services/validators/validators.services';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-exam-shop-add',
  templateUrl: './exam-shop-add.component.html',
  styleUrls: ['./exam-shop-add.component.scss'],
})
export class ExamShopAddComponent implements OnInit {
  @Input() inputID: any;
  validateFormAddOrEdit!: FormGroup;
  autoTips: Record<string, Record<string, string>> = {
    vi: {
      required: 'Không được bỏ trống!',
    },
    en: {
      required: 'Không được bỏ trống!',
    },
  };
  isLoadingSave = false;

  constructor(
    private fromBuilder: FormBuilder,
    private modalRef: NzModalRef,
    private shopService: ShopServices,
    private message: NzMessageService
  ) {
    const { required, maxLength } = MyValidators;

    this.validateFormAddOrEdit = this.fromBuilder.group({
      Name: ['', [required, maxLength(100)]],
      Location: ['', [required, maxLength(200)]],
    });
  }

  ngOnInit(): void {
    if (this.inputID) {
      this.shopService.getShop(this.inputID).subscribe(
        (data: any) => {
          debugger;
          if (data && data.Data) {
            this.validateFormAddOrEdit.controls['Name'].setValue(
              data['Data']['Name']
            );
            this.validateFormAddOrEdit.controls['Location'].setValue(
              data['Data']['Location']
            );
          }
        },
        (error: any) => {
          this.message.error('Có lỗi xảy ra!');
        }
      );
    }
  }

  close() {
    this.modalRef.close('close');
  }

  save() {
    if (!this.validateFormAddOrEdit.valid) {
      Object.values(this.validateFormAddOrEdit.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }
    this.isLoadingSave = true;
    let dataSave = this.validateFormAddOrEdit.value;
    if (this.inputID != '') dataSave.ID = this.inputID;

    this.shopService.addOrUpdateShop(dataSave).subscribe(
      (data: Shop) => {
        this.isLoadingSave = false;
        this.message.success('Thao tác thành công!');
        this.modalRef.close('save');
        this.onReset();
      },
      (error: any) => {
        this.isLoadingSave = false;
        this.message.error('Có lỗi xảy ra!');
      }
    );
  }

  onReset() {
    this.validateFormAddOrEdit.reset();
    this.inputID = '';
  }
}
