import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  registerForm !: FormGroup
  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      password:['']
    })
  }

  register() {
    this.http.post<any>("http://localhost:3000/registerUsers", this.registerForm.value)
      .subscribe((res : any) => {
        alert("Register!!")
        this.registerForm.reset()
        this.router.navigate(["login"])
      }, (err: Error) => {
        alert(err.message )
      })
  }

}
