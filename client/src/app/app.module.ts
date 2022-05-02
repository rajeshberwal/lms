import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { OrderComponent } from './components/user/order/order.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AdminDashboardComponent } from './components/admin/dashboard/dashboard.component';
import { UserService } from './services/user.service';
import { UserNavComponent } from './components/nav/user-nav/user-nav.component';
import { AdminNavComponent } from './components/nav/admin-nav/admin-nav.component';
import { MainNavComponent } from './components/nav/main-nav/main-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    OrderComponent,
    DashboardComponent,
    AdminDashboardComponent,
    MainNavComponent,
    UserNavComponent,
    AdminNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
