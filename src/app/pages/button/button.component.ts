import { Component, Input, OnInit } from '@angular/core';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() size: NzButtonSize = 'default';
  @Input() icon!: string;
  @Input() title!: string;
  @Input() type!: string;
  @Input() isShow: boolean = true;
  @Input() width!: number;

  constructor() {}

  ngOnInit(): void {}

  setColorButton(btType: string): string {
    if (btType === 'filter') return 'btn-filter';
    if (btType === 'add') return 'btn-add';
    if (btType === 'edit') return 'btn-edit';
    if (btType === 'sendMail') return 'btn-send-mail';
    if (btType === 'cancel') return 'btn-cancel';
    if (btType === 'delete') return 'btn-delete';
    if (btType === 'submit') return 'btn-submit';
    if (btType === 'save') return 'btn-save';
    if (btType === 'close') return 'btn-close-drawer';

    return '';
  }

  getWidth(): string {
   return `${this.width}px`;
  }
}
