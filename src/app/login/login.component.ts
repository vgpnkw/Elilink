import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoginService} from "./login.service";
import {UserModel} from "../user-list/user-list.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup
  constructor(private formBuilder : FormBuilder, private api: LoginService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:['']

    })
  }

  login() {
    this.api.getUsers()
      .subscribe((res : any) => {
            const user = res.find((a: any) => {
              return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
            })
            if (user) {
              this.showToastrErr("User","has been found")
              this.loginForm.reset()
              this.postUser(user)
            } else {
              this.showToastrErr("User","not found")
            }
          }, (err: Error) => {
            alert(err.message )
          })
  }

  postUser(user: any) {
    this.api.postUser(user)
      .subscribe((res: any) => {
        console.log('post')
        this.router.navigate(["userList"])
      }, (err: Error) => {
        alert(err.message)
      })
  }

  showToastrGood(message: string, title: string) {
    this.toastr.error(message,title)
  }

  showToastrErr(message: string, title: string) {
    this.toastr.error(message,title)
  }

}
