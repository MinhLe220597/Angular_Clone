import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Shop, ShopMulti } from 'src/app/models/main-models/shop';
import { ShopServices } from 'src/app/services/main-services/shopApi.services';
import { MyValidators } from 'src/app/services/validators/validators.services';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ProductServices } from 'src/app/services/main-services/productApi.services';

@Component({
  selector: 'app-exam-product-add',
  templateUrl: './exam-product-add.component.html',
  styleUrls: ['./exam-product-add.component.scss'],
})
export class ExamProductAddComponent implements OnInit {
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
  selectedShop = { value: '', label: '' };
  listShop: ShopMulti[] = [];

  constructor(
    private fromBuilder: FormBuilder,
    private modalRef: NzModalRef,
    private shopService: ShopServices,
    private productService: ProductServices,
    private message: NzMessageService
  ) {
    const { required, maxLength } = MyValidators;

    this.validateFormAddOrEdit = this.fromBuilder.group({
      Name: ['', [required, maxLength(100)]],
      Price: ['', [required, maxLength(200)]],
      ShopName: ['', []],
    });
  }

  //xử lý control: "combobox, multi select,..."
  compareShop = (o1: any, o2: any): boolean =>
    o1 && o2 ? o1.value === o2.value : o1 === o2;

  eventChangeShop(value: { label: string; value: string }): void {}

  loadSourceControl() {
    this.listShop = [];
    this.shopService.getShops().subscribe((data: Shop[]) => {
      data.forEach((item) => {
        let obj = new ShopMulti();
        obj.value = item.ID + '';
        obj.label = item.Name + '';
        this.listShop.push(obj);
      });
    });
  }

  ngOnInit(): void {
    this.loadSourceControl();
    if (this.inputID) {
      this.productService.getProduct(this.inputID).subscribe(
        (data: any) => {
          if (data && data.Data) {
            this.validateFormAddOrEdit.controls['Name'].setValue(
              data['Data']['Name']
            );
            this.validateFormAddOrEdit.controls['Price'].setValue(
              data['Data']['Price']
            );

            this.selectedShop = { value: data['Data']['ShopID'] + "", label: "" };
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
    dataSave.ShopID =
      this.selectedShop.value !== '' ? this.selectedShop.value : null;
    dataSave['ShopName'] = null;
    if (this.inputID != '') dataSave.ID = this.inputID;

    this.productService.addOrUpdateProduct(dataSave).subscribe(
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
