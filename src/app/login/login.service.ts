import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  postUser(data: any){
    // @ts-ignore
    return this.http.post<any>("http://localhost:3000/loginUser", data)
      .pipe(map((res:any) =>{
        return res
      }))
  }

  getUsers(){
    // @ts-ignore
    return this.http.get<any>("http://localhost:3000/users")
      .pipe(map((res:any) =>{
        return res
      }))
  }

  getUser(){
    // @ts-ignore
    return this.http.get<any>("http://localhost:3000/loginUser")
      .pipe(map((res:any) =>{
        return res
      }))
  }

  deleteUser(id: number){
    // @ts-ignore
    return this.http.delete<any>("http://localhost:3000/loginUser/" + id )
      .pipe(map((res:any) =>{
        return res
      }))
  }
}
