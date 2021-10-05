import {Component} from '@angular/core';
import {LoginService} from "./login/login.service";
import {map} from "rxjs/operators";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent{
  title = "elilink"
}
