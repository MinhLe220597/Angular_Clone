import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  BaseHandleProcessModel,
  ColumnSetting,
} from '../kendo-grid/model/grid.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ExamOrderAddComponent } from './exam-order-add/exam-order-add.component';
import { OrderServices } from 'src/app/services/main-services/orderApi.services';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { Product, ProductMulti } from 'src/app/models/main-models/product';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductServices } from 'src/app/services/main-services/productApi.services';
import { OrderSearch } from 'src/app/models/main-models/order';
import { ResponseModel } from 'src/app/models/core-models/response';

@Component({
  selector: 'app-exam-order',
  templateUrl: './exam-order.component.html',
  styleUrls: ['./exam-order.component.scss'],
})
export class ExamOrderComponent implements OnInit {
  urlGrid = '/api/Order/GetListOrder';
  column: ColumnSetting[] = [
    {
      field: 'CustomerName',
      title: 'Customer (Name - Email)',
      width: 500,
      type: 'text',
      hidden: false,
    },
    {
      field: 'ShopName',
      title: 'Shop (Name - Location)',
      width: 500,
      type: 'text',
      hidden: false,
    },
    {
      field: 'ProductName',
      title: 'Product (Name)',
      width: 300,
      type: 'text',
      hidden: false,
    },
  ];
  listCustom: { [id: string]: TemplateRef<any> } = {};
  @ViewChild('orderCustomer', { static: true })
  orderCustomer!: TemplateRef<any>;
  @ViewChild('orderShop', { static: true }) orderShop!: TemplateRef<any>;
  @ViewChild('drawerSearch', { static: false }) drawerSearch?: TemplateRef<{
    $implicit: { value: string };
    drawerRef: NzDrawerRef<string>;
  }>;
  selectedProduct = [];
  listProduct: ProductMulti[] = [];
  validateFormAddOrEdit!: FormGroup;
  objSearch: OrderSearch = {
    ListProductID: [],
  };
  selectedIDs: string[] = [];
  isShowBtnDelete: boolean = false;
  isShowBtnEdit: boolean = false;
  isReloadGrid: boolean = false;

  constructor(
    private modalService: NzModalService,
    private orderService: OrderServices,
    private productService: ProductServices,
    private message: NzMessageService,
    private drawerService: NzDrawerService,
    private fromBuilder: FormBuilder
  ) {
    this.validateFormAddOrEdit = this.fromBuilder.group({
      ProductName: ['', []],
    });
  }

  ngOnInit(): void {
    this.listCustom = {
      CustomerName: this.orderCustomer,
      ShopName: this.orderShop,
    };

    this.loadSourceControl();
    this.checkCount();
  }

  loadSourceControl() {
    this.listProduct = [];
    this.productService.getProductAll().subscribe((data: Product[]) => {
      data.forEach((item) => {
        let obj = new ProductMulti();
        obj.value = item.ID + '';
        obj.label = item.Name + '';
        this.listProduct.push(obj);
      });
    });
  }

  selectionChange($event: any) {
    if ($event && $event.length > 0) {
      this.isShowBtnDelete = true;
      if ($event.length === 1) this.isShowBtnEdit = true;
      else this.isShowBtnEdit = false;
    } else {
      this.isShowBtnDelete = false;
      this.isShowBtnEdit = false;
    }
    this.selectedIDs = $event;
  }

  addOrder() {
    const modalRef = this.modalService.create({
      nzTitle: 'Tạo mới đơn hàng',
      nzContent: ExamOrderAddComponent,
    });

    modalRef.afterClose.subscribe((data) => {
      if (data === 'save') {
        this.isReloadGrid = true;
      }
    });
  }

  reloadGridChange($event: any) {
    this.isReloadGrid = $event;
    this.selectedIDs = [];
    this.isShowBtnDelete = false;
    this.isShowBtnEdit = false;
  }

  editOrder() {
    const modalRef = this.modalService.create({
      nzTitle: 'Thay đổi thông tin đơn hàng',
      nzContent: ExamOrderAddComponent,
      nzComponentParams: {
        inputID: this.selectedIDs[0],
      },
    });

    modalRef.afterClose.subscribe((data) => {
      if (data === 'save') {
        this.isReloadGrid = true;
      }
    });
  }

  deleteOrder() {
    this.modalService.confirm({
      nzTitle: 'Xác nhận',
      nzContent:
        'Bạn xác nhận xoá ' + this.selectedIDs.length + ' dòng dữ liệu?',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          let objParam: BaseHandleProcessModel = {
            ListRecordID: this.selectedIDs,
          };

          this.orderService.deleteOrder(objParam).subscribe(
            (data: any) => {
              if (data && data['Status'] === 'E_SUCCESS') {
                this.message.success('Thao tác thành công!');
                this.isReloadGrid = true;
                this.checkCount();
              } else {
                this.message.warning('Thao tác thất bại!');
                this.isReloadGrid = true;
              }
              setTimeout(true ? resolve : reject, 300);
            },
            (error: any) => {
              setTimeout(true ? resolve : reject, 300);
              this.message.error('Có lỗi xảy ra!');
            }
          );
        }).catch(() => console.log('Oops errors!')),
    });
  }

  searchOrder() {
    const drawerRef = this.drawerService.create({
      nzTitle: 'Tìm kiếm',
      nzContent: this.drawerSearch,
      nzWidth: 400,
    });

    drawerRef.afterClose.subscribe(() => {
      if (this.selectedProduct.length > 0) {
        let productIDs = this.selectedProduct.map(function (a: ProductMulti) {
          return a.value;
        });
        this.objSearch['ListProductID'] = productIDs;
      } else {
        this.objSearch['ListProductID'] = [];
      }
      this.isReloadGrid = true;
    });
  }

  compareProduct = (o1: any, o2: any): boolean =>
    o1 && o2 ? o1.value === o2.value : o1 === o2;

  checkCount() {
    this.orderService.checkTotalAllData().subscribe(
      (data: ResponseModel) => {
        if (data && data['Data'] === false) {
          this.message.error('Không Đủ Dữ Liệu!');
        }
      },
      (error: any) => {
        this.message.error('Có lỗi xảy ra!');
      }
    );
  }
}
