import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { UserListComponent } from './user-list/user-list.component';
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {RouterModule} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { FooterComponent } from './footer/footer.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AdminDirective } from './admin.directive';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    LoginComponent,
    RegisterComponent,
    SiteLayoutComponent,
    FooterComponent,
    UserPageComponent,
    AdminDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
