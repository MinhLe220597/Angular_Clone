import { Component, Input, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-overtime-register',
  templateUrl: './overtime-register.component.html',
  styleUrls: ['./overtime-register.component.scss'],
})
export class OvertimeRegisterComponent implements OnInit {
  constructor(private drawerRef: NzDrawerRef) {}

  ngOnInit(): void {}

  close() {
    this.drawerRef.close('close');
  }
}
