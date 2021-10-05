import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {UserListComponent} from "./user-list/user-list.component";
import {SiteLayoutComponent} from "./shared/layouts/site-layout/site-layout.component";
import {UserPageComponent} from "./user-page/user-page.component";

const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: 'register', component: RegisterComponent },
  // { path: 'userlist', component: UserListComponent },
  // { path: '**', component: UserListComponent },
  { path: '', component: SiteLayoutComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'userlist', component: UserListComponent },
      { path: 'userPage/:id', component: UserPageComponent },
      { path: '**', component: UserListComponent },
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
