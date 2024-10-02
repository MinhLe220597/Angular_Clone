import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  BaseHandleProcessModel,
  ColumnSetting,
} from '../kendo-grid/model/grid.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ExamCustomerAddComponent } from './exam-customer-add/exam-customer-add.component';
import { CustomerServices } from 'src/app/services/main-services/customerApi.services';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ResponseModel } from 'src/app/models/core-models/response';

@Component({
  selector: 'app-exam-customer',
  templateUrl: './exam-customer.component.html',
  styleUrls: ['./exam-customer.component.scss'],
})
export class ExamCustomerComponent implements OnInit {
  urlGrid = '/api/Customer/GetListCustomer';
  column: ColumnSetting[] = [
    {
      field: 'FullName',
      title: 'Full Name',
      width: 350,
      type: 'text',
      hidden: false,
    },
    {
      field: 'Birthday',
      title: 'Date of Birth - DOB',
      width: 300,
      type: 'date',
      format: 'MM/dd/yyyy',
      hidden: false,
    },
    {
      field: 'Email',
      title: 'Email',
      width: 550,
      type: 'text',
      hidden: false,
    },
  ];
  selectedIDs: string[] = [];
  isShowBtnDelete: boolean = false;
  isShowBtnEdit: boolean = false;
  isReloadGrid: boolean = false;

  listCustom: { [id: string]: TemplateRef<any> } = {};
  @ViewChild('customerDate', { static: true }) customerDate!: TemplateRef<any>;

  constructor(
    private modalService: NzModalService,
    private customerService: CustomerServices,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.listCustom = {
      Birthday: this.customerDate,
    };

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

  addCustomer() {
    const modalRef = this.modalService.create({
      nzTitle: 'Thêm mới khách hàng',
      nzContent: ExamCustomerAddComponent,
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

  editCustomer() {
    const modalRef = this.modalService.create({
      nzTitle: 'Thay đổi thông tin khách hàng',
      nzContent: ExamCustomerAddComponent,
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

  deleteCustomer() {
    this.modalService.confirm({
      nzTitle: 'Xác nhận',
      nzContent:
        'Bạn xác nhận xoá ' + this.selectedIDs.length + ' dòng dữ liệu?',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          let objParam: BaseHandleProcessModel = {
            ListRecordID: this.selectedIDs,
          };

          this.customerService.deleteCustomer(objParam).subscribe(
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
    this.customerService.checkTotalCustomer().subscribe(
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
