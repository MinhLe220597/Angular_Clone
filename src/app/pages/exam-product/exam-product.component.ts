import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  BaseHandleProcessModel,
  ColumnSetting,
} from '../kendo-grid/model/grid.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ExamProductAddComponent } from './exam-product-add/exam-product-add.component';
import { ProductServices } from 'src/app/services/main-services/productApi.services';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductSearch } from 'src/app/models/main-models/product';
import { ResponseModel } from 'src/app/models/core-models/response';

@Component({
  selector: 'app-exam-product',
  templateUrl: './exam-product.component.html',
  styleUrls: ['./exam-product.component.scss'],
})
export class ExamProductComponent implements OnInit {
  urlGrid = '/api/Product/GetListProduct';
  columnOvertime: ColumnSetting[] = [
    {
      field: 'Name',
      title: 'Name',
      width: 350,
      type: 'text',
      hidden: false,
    },
    {
      field: 'Price',
      title: 'Price',
      width: 300,
      type: 'text',
      hidden: false,
    },
    {
      field: 'ShopName',
      title: 'Shop',
      width: 650,
      type: 'text',
      hidden: false,
    },
  ];
  selectedIDs: string[] = [];
  isShowBtnDelete: boolean = false;
  isShowBtnEdit: boolean = false;
  isReloadGrid: boolean = false;
  validateFormAddOrEdit!: FormGroup;
  @ViewChild('drawerSearch', { static: false }) drawerSearch?: TemplateRef<{
    $implicit: { value: string };
    drawerRef: NzDrawerRef<string>;
  }>;
  objSearch: ProductSearch = {
    Name: null
  };

  constructor(
    private modalService: NzModalService,
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
    this.checkCount();
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

  addProduct() {
    const modalRef = this.modalService.create({
      nzTitle: 'Tạo mới sản phẩm',
      nzContent: ExamProductAddComponent,
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

  editProduct() {
    const modalRef = this.modalService.create({
      nzTitle: 'Thay đổi thông tin sản phẩm',
      nzContent: ExamProductAddComponent,
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

  deleteProduct() {
    this.modalService.confirm({
      nzTitle: 'Xác nhận',
      nzContent:
        'Bạn xác nhận xoá ' + this.selectedIDs.length + ' dòng dữ liệu?',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          debugger
          let objParam: BaseHandleProcessModel = {
            ListRecordID: this.selectedIDs,
          };

          this.productService.deleteProduct(objParam).subscribe(
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

  searchProduct() {
    const drawerRef = this.drawerService.create({
      nzTitle: 'Tìm kiếm',
      nzContent: this.drawerSearch,
      nzWidth: 400,
    });

    drawerRef.afterClose.subscribe(() => {
      let dataSave = this.validateFormAddOrEdit.value;
      this.objSearch.Name = dataSave['ProductName'] != '' ? dataSave['ProductName'] : null;
      this.isReloadGrid = true;
    });
  }

  checkCount() {
    this.productService.checkTotalProduct().subscribe(
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
