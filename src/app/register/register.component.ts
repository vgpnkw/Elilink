import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  registerForm !: FormGroup
  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      password:['']
    })
  }

  register() {
    this.http.post<any>("http://localhost:3000/users", this.registerForm.value)
      .subscribe((res : any) => {
        this.showToastrGood("User","has been register")
        this.registerForm.reset()
        this.router.navigate(["login"])
      }, (err: Error) => {
        this.showToastrGood("Error",err.message)
      })
  }

  showToastrGood(message: string, title: string) {
    this.toastr.success(message,title)
  }

  showToastrErr(message: string, title: string) {
    this.toastr.error(message,title)
  }

}
