import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  listCustom: { [id: string]: TemplateRef<any> } = {};
  @ViewChild('categoryCode', { static: true }) categoryCode!: TemplateRef<any>;

  constructor() {}

  ngOnInit(): void {
    this.listCustom = {
      Code: this.categoryCode,
      // CategoryName: this.categoryCode,
    };
  }
}
