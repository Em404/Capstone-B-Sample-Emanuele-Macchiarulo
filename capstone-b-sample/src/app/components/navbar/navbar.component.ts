import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isLoggedSubscription!:Subscription;
  isLogged!:boolean;
  toggle: boolean = false;

  constructor(private loginSvc: LoginService, private router: Router) {}

  ngOnInit(){
    this.isLoggedSubscription = this.loginSvc.loggedIn$.subscribe(data => {
      this.isLogged = data;
    })
  }

  isLoggedIn() {
    return this.loginSvc.isLoggedIn();
  }

  loginLogout() {
    if (this.isLoggedIn()) {
      this.loginSvc.logout();
    } else {
      this.router.navigate(['/login']);
    }
  }

  toggleMenu() {
    this.toggle = !this.toggle;
  }

}
