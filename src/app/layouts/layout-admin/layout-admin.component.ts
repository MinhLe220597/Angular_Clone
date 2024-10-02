import { Component, OnInit } from '@angular/core';
import { Menu, listMenu } from '../menu';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-admin',
  templateUrl: './layout-admin.component.html',
  styleUrls: ['./layout-admin.component.scss'],
})
export class LayoutAdminComponent implements OnInit {
  menus = listMenu;
  pageName = '';
  location: Location;

  constructor(location: Location, private router: Router) {
    this.location = location;
    this.getPageDefault();
  }

  ngOnInit(): void {}

  showChild(itemMenu: Menu[] | undefined): boolean | undefined {
    let childrenItem = itemMenu?.filter((item) => item.listChildren);
    if (childrenItem && childrenItem.length > 0) return true;
    return false;
  }

  getPageDefault() {
    // this.router.navigate(['/admin/dashboard']);
    // this.pageName = 'Dashboard';

    this.router.navigate(['/admin/game-vocabulary']);
    this.pageName = 'Game Vocabulary';
  }

  selectedMenu(linkName: any) {
    if (linkName && linkName.name) {
      this.pageName = linkName.title;
    } else {
      this.getPageDefault();
    }
  }
}
