import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private loginSvc: LoginService, private router: Router) {}

  isLoggedIn() {
    return this.loginSvc.isLoggedIn();
  }

  loginLogout() {
    if (this.isLoggedIn()) {
      this.loginSvc.logout();
    } else {
      // this.loginSvc.login();
      this.router.navigate(['/login']);
    }
  }

}
