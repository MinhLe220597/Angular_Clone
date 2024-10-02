import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  BaseHandleProcessModel,
  ColumnSetting,
} from '../kendo-grid/model/grid.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ExamShopAddComponent } from './exam-shop-add/exam-shop-add.component';
import { ShopServices } from 'src/app/services/main-services/shopApi.services';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ResponseModel } from 'src/app/models/core-models/response';

@Component({
  selector: 'app-exam-shop',
  templateUrl: './exam-shop.component.html',
  styleUrls: ['./exam-shop.component.scss'],
})
export class ExamShopComponent implements OnInit {
  urlGrid = '/api/Shop/GetListShop';
  columnOvertime: ColumnSetting[] = [
    {
      field: 'Name',
      title: 'Name',
      width: 500,
      type: 'text',
      hidden: false,
    },
    {
      field: 'Location',
      title: 'Location',
      width: 800,
      type: 'text',
      hidden: false,
    },
  ];
  selectedIDs: string[] = [];
  isShowBtnDelete: boolean = false;
  isShowBtnEdit: boolean = false;
  isReloadGrid: boolean = false;

  constructor(
    private modalService: NzModalService,
    private shopService: ShopServices,
    private message: NzMessageService
  ) {}

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

  addShop() {
    const modalRef = this.modalService.create({
      nzTitle: 'Tạo mới cửa hàng',
      nzContent: ExamShopAddComponent,
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

  editShop() {
    const modalRef = this.modalService.create({
      nzTitle: 'Thay đổi thông tin cửa hàng',
      nzContent: ExamShopAddComponent,
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

  deleteShop() {
    this.modalService.confirm({
      nzTitle: 'Xác nhận',
      nzContent:
        'Bạn xác nhận xoá ' + this.selectedIDs.length + ' dòng dữ liệu?',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          let objParam: BaseHandleProcessModel = {
            ListRecordID: this.selectedIDs,
          };

          this.shopService.deleteShop(objParam).subscribe(
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

  checkCount() {
    this.shopService.checkTotalShop().subscribe(
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
