import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ColumnSetting } from '../kendo-grid/model/grid.model';
import { environment } from 'src/environments/environment';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { OvertimeRegisterComponent } from './overtime-register/overtime-register.component';

@Component({
  selector: 'app-overtime',
  templateUrl: './overtime.component.html',
  styleUrls: ['./overtime.component.scss'],
})
export class OvertimeComponent implements OnInit {
  listCustom: { [id: string]: TemplateRef<any> } = {};
  @ViewChild('profileInfo', { static: true }) profileInfo!: TemplateRef<any>;
  @ViewChild('workDateInfo', { static: true }) workDateInfo!: TemplateRef<any>;
  @ViewChild('registerHoursInfo', { static: true })
  registerHoursInfo!: TemplateRef<any>;
  @ViewChild('statusInfo', { static: true }) statusInfo!: TemplateRef<any>;
  urlGrid = '/api/Overtime/GetListOvertime';
  columnOvertime: ColumnSetting[] = [
    {
      field: 'CodeEmp',
      title: 'Nhân viên',
      width: 240,
      type: 'text',
      hidden: false,
    },
    {
      field: 'WorkDate',
      title: 'Ngày công',
      width: 180,
      type: 'text',
      hidden: false,
      format: 'DD/MM/YYYY',
    },
    {
      field: 'RegisterHours',
      title: 'Thời gian đăng ký',
      width: 250,
      type: 'text',
      hidden: false,
    },
    {
      field: 'DataNote',
      title: 'Lý do',
      width: 390,
      type: 'text',
      hidden: false,
    },
    {
      field: 'Status',
      title: 'Trạng thái',
      width: 240,
      type: 'text',
      hidden: false,
    },
  ];
  isShowBtn: boolean = false;

  constructor(private drawerService: NzDrawerService) {}

  ngOnInit(): void {
    this.listCustom = {
      CodeEmp: this.profileInfo,
      WorkDate: this.workDateInfo,
      RegisterHours: this.registerHoursInfo,
      Status: this.statusInfo,
    };
  }

  photoURL(imagePath: string): string {
    return `${environment.mainApiUrl}${imagePath}`;
  }

  setColorStatus(statusInfo: any): string {
    let color = '';
    if (
      statusInfo['Status'] === 'E_APPROVED' ||
      statusInfo['Status'] === 'E_APPROVED1' ||
      statusInfo['Status'] === 'E_APPROVED2' ||
      statusInfo['Status'] === 'E_APPROVED3'
    )
      color = 'green';
    else if (statusInfo['Status'] === 'E_SUBMIT') color = 'orange';
    else if (statusInfo['Status'] === 'E_SUBMIT_TEMP') color = '';

    return color;
  }

  selectionChange($event: any) {
    if ($event && $event.length > 0) this.isShowBtn = true;
    else this.isShowBtn = false;
  }

  registerOvertime() {
    const drawerRef = this.drawerService.create<OvertimeRegisterComponent>({
      nzTitle: 'Đăng ký tăng ca',
      nzWidth: 750,
      nzClosable: false,
      nzContent: OvertimeRegisterComponent,
      nzMaskClosable: false,
      nzContentParams: {},
    });

    // drawerRef.afterOpen.subscribe(() => {
    //   console.log('Drawer(Component) open');
    // });

    drawerRef.afterClose.subscribe(data => {
    });
  }
}
