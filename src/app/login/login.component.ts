import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm !: FormGroup
  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:['']

    })
  }

  login() {
    this.http.get<any>("http://localhost:3000/registerUsers")
      .subscribe((res : any) => {
        const user = res.find((a: any) => {
          alert(a.password)
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
        })
        if (user) {
          alert("Login!!!")
          this.loginForm.reset()
          this.router.navigate(["userList"])
        } else {
          alert("User not found ")
        }
      }, (err: Error) => {
        alert(err.message )
      })
  }

}
