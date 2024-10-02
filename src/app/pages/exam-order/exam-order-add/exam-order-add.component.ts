import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Shop, ShopMulti } from 'src/app/models/main-models/shop';
import { ShopServices } from 'src/app/services/main-services/shopApi.services';
import { MyValidators } from 'src/app/services/validators/validators.services';
import { NzMessageService } from 'ng-zorro-antd/message';
import { OrderServices } from 'src/app/services/main-services/orderApi.services';
import { CustomerServices } from 'src/app/services/main-services/customerApi.services';
import { Customer, CustomerMulti } from 'src/app/models/main-models/customer';
import { Product, ProductMulti } from 'src/app/models/main-models/product';
import { ProductServices } from 'src/app/services/main-services/productApi.services';

@Component({
  selector: 'app-exam-order-add',
  templateUrl: './exam-order-add.component.html',
  styleUrls: ['./exam-order-add.component.scss'],
})
export class ExamOrderAddComponent implements OnInit {
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
  selectedCustomer = { value: '', label: '' };
  selectedShop = { value: '', label: '' };
  selectedProduct = { value: '', label: '' };
  listCustomer: CustomerMulti[] = [];
  listShop: ShopMulti[] = [];
  listProduct: ProductMulti[] = [];

  constructor(
    private fromBuilder: FormBuilder,
    private modalRef: NzModalRef,
    private shopService: ShopServices,
    private orderService: OrderServices,
    private customerService: CustomerServices,
    private productService: ProductServices,
    private message: NzMessageService
  ) {
    const { required, maxLength } = MyValidators;

    this.validateFormAddOrEdit = this.fromBuilder.group({
      CustomerName: ['', [required]],
      ShopName: ['', [required]],
      ProductName: ['', [required]],
    });
  }

  //xử lý control: "combobox, multi select,..."
  compareCustomer = (o1: any, o2: any): boolean =>
    o1 && o2 ? o1.value === o2.value : o1 === o2;

  compareShop = (o1: any, o2: any): boolean =>
    o1 && o2 ? o1.value === o2.value : o1 === o2;

  compareProduct = (o1: any, o2: any): boolean =>
    o1 && o2 ? o1.value === o2.value : o1 === o2;

  loadSourceControl() {
    this.listCustomer = [];
    this.listShop = [];
    this.listProduct = [];

    this.customerService.getCustomers().subscribe((data: Customer[]) => {
      data.forEach((item) => {
        let obj = new CustomerMulti();
        obj.value = item.ID + '';
        obj.label = item.FullName + '';
        this.listCustomer.push(obj);
      });
    });

    this.shopService.getShops().subscribe((data: Shop[]) => {
      data.forEach((item) => {
        let obj = new ShopMulti();
        obj.value = item.ID + '';
        obj.label = item.Name + '';
        this.listShop.push(obj);
      });
    });
  }

  eventChangeShop($event: any, productID: string) {
    this.listProduct = [];
    this.selectedProduct = {
      value: '',
      label: '',
    };

    let shopID = this.selectedShop.value;
    if (shopID && shopID != '') {
      this.productService.getProducts(shopID).subscribe((data: Product[]) => {
        if (this.listProduct && this.listProduct.length === 0) {
          data.forEach((item) => {
            let obj = new CustomerMulti();
            obj.value = item.ID + '';
            obj.label = item.Name + '';
            this.listProduct.push(obj);
          });
        }

        if (productID && productID != '') {
          this.selectedProduct = {
            value: productID + '',
            label: '',
          };
        }
      });
    }
  }

  ngOnInit(): void {
    this.loadSourceControl();
    if (this.inputID) {
      this.orderService.getOrder(this.inputID).subscribe(
        (data: any) => {
          if (data && data.Data) {
            this.selectedCustomer = {
              value: data['Data']['CustomerID'] + '',
              label: '',
            };

            this.selectedShop = {
              value: data['Data']['ShopID'] + '',
              label: '',
            };

            this.eventChangeShop(
              data['Data']['ShopID'],
              data['Data']['ProductID']
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
    dataSave.CustomerID =
      this.selectedCustomer.value !== '' ? this.selectedCustomer.value : null;
    dataSave['CustomerName'] = null;

    dataSave.ShopID =
      this.selectedShop.value !== '' ? this.selectedShop.value : null;
    dataSave['ShopName'] = null;

    dataSave.ProductID =
      this.selectedProduct.value !== '' ? this.selectedProduct.value : null;
    dataSave['ProductName'] = null;

    if (this.inputID != '') dataSave.ID = this.inputID;

    this.orderService.addOrUpdateOrder(dataSave).subscribe(
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
