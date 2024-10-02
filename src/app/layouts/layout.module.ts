//import module
import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutRoutingModule } from './layout-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzStepsModule } from 'ng-zorro-antd/steps';

// import component
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import { KendoGridComponent } from '../pages/kendo-grid/kendo-grid.component';
import { CategoryComponent } from '../pages/category/category.component';
import { ButtonComponent } from '../pages/button/button.component';
import { OvertimeComponent } from '../pages/overtime/overtime.component';
import { OvertimeRegisterComponent } from '../pages/overtime/overtime-register/overtime-register.component';
import { ExamShopComponent } from '../pages/exam-shop/exam-shop.component';
import { ExamShopAddComponent } from '../pages/exam-shop/exam-shop-add/exam-shop-add.component';
import { ExamProductComponent } from '../pages/exam-product/exam-product.component';
import { ExamProductAddComponent } from '../pages/exam-product/exam-product-add/exam-product-add.component';
import { ExamCustomerComponent } from '../pages/exam-customer/exam-customer.component';
import { ExamCustomerAddComponent } from '../pages/exam-customer/exam-customer-add/exam-customer-add.component';
import { ExamOrderComponent } from '../pages/exam-order/exam-order.component';
import { ExamOrderAddComponent } from '../pages/exam-order/exam-order-add/exam-order-add.component';
import { TestComponent } from '../pages/test/test.component';
import { LoginComponent } from '../pages/login/login.component';
import { LearnVocabularyComponent } from '../pages/learn-vocabulary/learn-vocabulary.component';
import { VocabularyDetailComponent } from '../pages/learn-vocabulary/vocabulary-detail/vocabulary-detail.component';
import { GameVocabularyComponent } from '../pages/game-vocabulary/game-vocabulary.component';
import { GameDetailComponent } from '../pages/game-vocabulary/game-detail/game-detail.component';

//import service
import { GridService } from '../pages/kendo-grid/service/kendogrid.service';

//import lib extend
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
registerLocaleData(en);

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzMenuModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    GridModule,
    NzCardModule,
    NzGridModule,
    NzTagModule,
    NzButtonModule,
    NzIconModule,
    NzModalModule,
    NzDrawerModule,
    NzInputModule,
    NzFormModule,
    NzMessageModule,
    NzSelectModule,
    NzDatePickerModule,
    NzStepsModule,
  ],
  declarations: [
    LayoutAdminComponent,
    LoginComponent,
    DashboardComponent,
    KendoGridComponent,
    CategoryComponent,
    OvertimeComponent,
    ButtonComponent,
    OvertimeRegisterComponent,
    ExamShopComponent,
    ExamShopAddComponent,
    ExamProductComponent,
    ExamProductAddComponent,
    ExamCustomerComponent,
    ExamCustomerAddComponent,
    ExamOrderComponent,
    ExamOrderAddComponent,
    TestComponent,
    LearnVocabularyComponent,
    VocabularyDetailComponent,
    GameVocabularyComponent,
    GameDetailComponent,
  ],
  providers: [
    {
      provide: [NZ_I18N],
      useValue: en_US,
    },
    GridService,
  ],
})
export class LayoutAdminModule {}
