import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserModel} from "./user-list.model";
import {ApiService} from "../shared/api.service";
import {Observable, Subscriber} from "rxjs";
import {File} from "@angular/compiler-cli/src/ngtsc/file_system/testing/src/mock_file_system";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit {
  searchValue !: FormGroup
  formValue ! : FormGroup
  userData !: any
  userModelObj : UserModel = new UserModel()
  updateBtn !: boolean
  addBtn !: boolean
  myimage !: string;
  constructor(private formBuilder: FormBuilder, private api: ApiService, private router: Router) {
    this.searchValue = new FormGroup({

      "searchValue": new FormControl("", [Validators.required, this.searchValidator, Validators.pattern('[a-zA-Z ]')])
    });
  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      gender: [''],
      city: [''],
      age: [''],
      email: [''],
      avatar: [''],
      admin: []
    })
    this.getAllUsers()
  }

  postUserDetails() {
    this.userModelObj.firstName = this.formValue.value.firstName
    this.userModelObj.lastName = this.formValue.value.lastName
    this.userModelObj.city = this.formValue.value.city
    this.userModelObj.gender = this.formValue.value.gender
    this.userModelObj.email = this.formValue.value.email
    this.userModelObj.age = this.formValue.value.age
    this.userModelObj.avatar = this.myimage
    this.formValue.value.admin ? this.userModelObj.admin = true : this.userModelObj.admin = false

    this.api.postUsers(this.userModelObj)
      .subscribe((res: any) => {
        console.log(res)
        alert("Work!!!!")
        let ref = document.getElementById("cancel")
        ref?.click()
        this.formValue.reset()
        this.getAllUsers()
      }, (err: Error) => {
        alert(err.message)
      })


  }
  getAllUsers() {
    this.api.getUsers()
      .subscribe((res: any) => {
        this.userData = res
      })
  }

  deleteUSer(user : any) {
    this.api.deleteUsers(user.id)
      .subscribe((res: any) => {
        alert("Deleted")
        this.getAllUsers()
      })
  }

  editUser(user : any) {
    this.updateBtn = true
    this.addBtn = false
    this.userModelObj.id = user.id
    this.formValue.controls['firstName'].setValue(user.firstName)
    this.formValue.controls['lastName'].setValue(user.lastName)
    this.formValue.controls['age'].setValue(user.age)
    this.formValue.controls['city'].setValue(user.city)
    this.formValue.controls['gender'].setValue(user.gender)
    this.formValue.controls['email'].setValue(user.email)
    this.formValue.controls['avatar'].setValue(user.avatar)
  }

  updateUserDetails() {
    this.userModelObj.firstName = this.formValue.value.firstName
    this.userModelObj.lastName = this.formValue.value.lastName
    this.userModelObj.city = this.formValue.value.city
    this.userModelObj.gender = this.formValue.value.gender
    this.userModelObj.email = this.formValue.value.email
    this.userModelObj.age = this.formValue.value.age
    this.userModelObj.avatar = this.myimage
    this.formValue.value.admin ? this.userModelObj.admin = true : this.userModelObj.admin = false
    this.api.updateUsers(this.userModelObj, this.userModelObj.id)
      .subscribe((res: any) => {
        alert("Update ok!")
        let ref = document.getElementById("cancel")
        ref?.click()
        this.formValue.reset()
        this.getAllUsers()
      })
  }

  clickAddUser() {
    this.formValue.reset()
    this.addBtn = true
    this.updateBtn = false
  }

  onChange($event: Event) {
    // @ts-ignore
    const file = ($event.target as HTMLInputElement).files[0];
    // @ts-ignore
    this.convertToBase64(file);
  }

  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    observable.subscribe((d: string) =>{
      this.myimage = d
    }, (error : Error) => {
      alert(error.message)
    })
  }

  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    // @ts-ignore
    filereader.readAsDataURL(file);

    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }


  userClick(id: any) {
    this.router.navigate(["userPage", id])
  }

  searchValidator(control: FormControl): {[s:string]:boolean}|null{

    if(control.value==="нет"){
      return {"userName": true};
    }
    return null;
  }


}
