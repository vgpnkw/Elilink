import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postUsers(data: any){
    // @ts-ignore
    return this.http.post<any>("http://localhost:3000/users", data)
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
  updateUsers(data: any, id: number){
    // @ts-ignore
    return this.http.put<any>("http://localhost:3000/users/" + id, data)
      .pipe(map((res:any) =>{
        return res
      }))
  }
  deleteUsers(id: number){
    // @ts-ignore
    return this.http.delete<any>("http://localhost:3000/users/" + id )
      .pipe(map((res:any) =>{
        return res
      }))
  }


  clickUser(id: number){
    // @ts-ignore
    return this.http.get<any>("http://localhost:3000/users/" + id )
      .pipe(map((res:any) =>{
        return res
      }))
  }
}
