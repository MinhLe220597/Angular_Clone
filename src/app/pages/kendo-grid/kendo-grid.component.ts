import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ColumnSetting, GridSetting } from './model/grid.model';
import { GridService } from './service/kendogrid.service';
import { PageChangeEvent } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';

@Component({
  selector: 'app-kendo-grid',
  templateUrl: './kendo-grid.component.html',
  styleUrls: ['./kendo-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class KendoGridComponent implements OnInit, OnChanges {
  @Input() urlGrid: string = '/api/Category/GetListCategory';
  @Input() objSearch: any = {};
  @Input() pageSize: number = 5;
  @Input() columnSettings: ColumnSetting[] = [
    // { field: 'ID', title: '', width: 20, type: 'text', hidden: true },
    {
      field: 'Code',
      title: 'Mã danh mục',
      width: 200,
      hidden: false,
      type: 'text',
    },
    {
      field: 'CategoryName',
      title: 'Tên danh mục',
      width: 420,
      hidden: false,
      type: 'text',
    },
    {
      field: 'Note',
      title: 'Ghi chú',
      width: 650,
      hidden: false,
      type: 'text',
    },
  ];
  @Input() listColumnCostom: { [id: string]: TemplateRef<any> } = {};
  @Input() isResize: boolean = false;
  @Input() isReload: boolean = false;
  @Output() selectionChange = new EventEmitter<string[]>();
  @Output() reloadGridChange = new EventEmitter<boolean>();
  selectedIDs: string[] = [];
  state: State = {
    skip: 0,
    take: this.pageSize,
  };
  gridSetting: GridSetting = {
    urlGrid: '',
    objSearch: this.objSearch,
  };

  constructor(public gridService: GridService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isReload'].currentValue === true) {
      this.reloadGrid();
      this.reloadGridChange.emit(false);
    }
  }

  ngOnInit(): void {
    this.gridSetting.urlGrid = this.urlGrid;
    this.state.take = this.pageSize;
    this.gridSetting.objSearch = this.objSearch;
    this.gridService.query(this.gridSetting, this.state);

    //column template grid bind server
    if (this.listColumnCostom) {
      for (let index = 0; index < this.columnSettings.length; index++) {
        if (this.listColumnCostom[this.columnSettings[index].field]) {
          this.columnSettings[index].template =
            this.listColumnCostom[this.columnSettings[index].field];
        }
      }
    }
  }

  pageChange(state: PageChangeEvent): void {
    this.selectedIDs = [];
    this.state.skip = state.skip;
    this.gridSetting.objSearch = this.objSearch;
    this.gridService.query(this.gridSetting, state);
  }

  reloadGrid(): void {
    this.selectedIDs = [];
    this.state.skip = 0;
    this.gridSetting.objSearch = this.objSearch;
    this.gridService.query(this.gridSetting, this.state);
  }

  eventSeletedRow($event: any) {
    this.selectionChange.emit(this.selectedIDs);
  }
}
