import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../shared/api.service";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.sass']
})
export class UserPageComponent implements OnInit{
  id: any;
  user:any
  private routeSubscription: Subscription;
  constructor(private route: ActivatedRoute, private api: ApiService) {
    this.routeSubscription = route.params.subscribe(params=>this.id=params['id']);
  }

  ngOnInit() {
    this.api.clickUser(this.id)
      .subscribe((res: any) => {
        this.user = res
      })
  }
}
