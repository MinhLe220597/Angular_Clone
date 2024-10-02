import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutAdminModule } from './layouts/layout.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from './services/auth/interceptor';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './services/ngrx-store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './services/ngrx-store/user/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    LayoutAdminModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    // ngrx
    // StoreModule.forRoot(reducers, {metaReducers}),
    // EffectsModule.forRoot([UserEffects]),
    // StoreRouterConnectingModule.forRoot(),
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthenticationInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
