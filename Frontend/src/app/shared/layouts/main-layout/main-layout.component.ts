import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  constructor(private auth: AuthService,
              private router: Router
              ) {}

  onClickLogout() {
    this.auth.logout()
    this.router.navigate(['/login'])
  }

}
