import {AfterContentInit, AfterViewChecked, Component, DoCheck, OnInit} from '@angular/core';
import {LoginService} from "../../../login/login.service";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.sass']
})
export class SiteLayoutComponent implements OnInit {

  constructor(private api: LoginService) {
  }
  userData !: any
  ngOnInit() : void {
    this.check()
  }




  logout() {
    this.api.deleteUser(this.userData[0].id)
      .subscribe((res: any) => {
        this.check()
      })
  }

  check() {
    this.api.getUser()
      .subscribe((res: any) => {
        this.userData = res
      })
  }

}
