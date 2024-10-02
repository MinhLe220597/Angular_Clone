import { TemplateRef } from "@angular/core";

export interface ColumnSetting {
  field: string;
  title: string;
  width: number;
  format?: string;
  type: 'text' | 'numberic' | 'boolean' | 'date';
  hidden: boolean;
  template?: any;
}

export interface GridSetting {
  urlGrid: string;
  objSearch: any;
}

export class Category {
  public CategoryID?: number;
  public CategoryName?: string;
  public Description?: string;
}

export class CategorySearch {
  public Code!: string;
  public CategoryName!: string;
}

export class BaseHandleProcessModel {
  ListRecordID!: string[];
}
