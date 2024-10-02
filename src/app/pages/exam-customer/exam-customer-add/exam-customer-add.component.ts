import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { MyValidators } from 'src/app/services/validators/validators.services';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as moment from 'moment';
import { CustomerServices } from 'src/app/services/main-services/customerApi.services';
import { Customer } from 'src/app/models/main-models/customer';
import { ResponseModel } from 'src/app/models/core-models/response';

@Component({
  selector: 'app-exam-customer-add',
  templateUrl: './exam-customer-add.component.html',
  styleUrls: ['./exam-customer-add.component.scss'],
})
export class ExamCustomerAddComponent implements OnInit {
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
    private customerService: CustomerServices,
    private message: NzMessageService
  ) {
    const { required, maxLength } = MyValidators;

    this.validateFormAddOrEdit = this.fromBuilder.group({
      FullName: ['', [required, maxLength(100)]],
      Birthday: [null, [required]],
      Email: ['', [required, maxLength(100)]],
    });
  }

  ngOnInit(): void {
    if (this.inputID) {
      this.customerService.getCustomer(this.inputID).subscribe(
        (data: any) => {
          debugger;
          if (data && data.Data) {
            this.validateFormAddOrEdit.controls['FullName'].setValue(
              data['Data']['FullName']
            );
            this.validateFormAddOrEdit.controls['Birthday'].setValue(
              data['Data']['Birthday']
            );
            this.validateFormAddOrEdit.controls['Email'].setValue(
              data['Data']['Email']
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
    //xu ly dateTime
    let birthday = this.validateFormAddOrEdit.value['Birthday'];
    if (!(birthday instanceof Date)) {
      birthday = new Date(birthday);
    }

    birthday.setHours(birthday.getHours() + 7);
    dataSave['Birthday'] = birthday;
    if (this.inputID != '') dataSave.ID = this.inputID;

    this.customerService.addOrUpdateCustomer(dataSave).subscribe(
      (data: ResponseModel) => {
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
