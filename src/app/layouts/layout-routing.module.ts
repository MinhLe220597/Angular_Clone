import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { KendoGridComponent } from '../pages/kendo-grid/kendo-grid.component';
import { TestComponent } from '../pages/test/test.component';
import { CategoryComponent } from '../pages/category/category.component';
import { OvertimeComponent } from '../pages/overtime/overtime.component';
import { ExamShopComponent } from '../pages/exam-shop/exam-shop.component';
import { ExamProductComponent } from '../pages/exam-product/exam-product.component';
import { ExamCustomerComponent } from '../pages/exam-customer/exam-customer.component';
import { ExamOrderComponent } from '../pages/exam-order/exam-order.component';
import { LoginComponent } from '../pages/login/login.component';
import { LearnVocabularyComponent } from '../pages/learn-vocabulary/learn-vocabulary.component';
import { GameVocabularyComponent } from '../pages/game-vocabulary/game-vocabulary.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  // { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: LayoutAdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'kendogrid',
        component: KendoGridComponent,
      },
      {
        path: 'test',
        component: TestComponent,
      },
      {
        path: 'category',
        component: CategoryComponent,
      },
      {
        path: 'overtime',
        component: OvertimeComponent,
      },
      {
        path: 'exam-shop',
        component: ExamShopComponent,
      },
      {
        path: 'exam-product',
        component: ExamProductComponent,
      },
      {
        path: 'exam-customer',
        component: ExamCustomerComponent,
      },
      {
        path: 'exam-order',
        component: ExamOrderComponent,
      },
      {
        path: 'test',
        component: TestComponent,
      },
      {
        path: 'learn-vocabulary',
        component: LearnVocabularyComponent,
      },
      {
        path: 'game-vocabulary',
        component: GameVocabularyComponent,
      },
    ],
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
