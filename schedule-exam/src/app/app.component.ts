import {Component, OnInit} from '@angular/core';
import {AuthService} from "./Services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private _auth: AuthService) {
  }
  ngOnInit(): void {
    const userInfo = this._auth.getUserInfo();
    if(userInfo) {
      const {id, role} = userInfo;
      this._auth.redirectToRolePage(role);
      this._auth.setUserId(id);
    } else {
      console.log('User is not logged in.');
    }
  }
}
