import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  hasAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private loginService: LoginService) {
    this.loginService.loggedIn$.subscribe((user) => {
      if (user) {
        this.changeAuth(true);
      } else {
        this.changeAuth(false);
      }
    });
  }

  changeAuth(value: boolean) {
    this.hasAuth.next(value);
  }

  public get isLogged(): boolean {
    return this.hasAuth.value;
  }

  public logOut() {
    return this.loginService.logout();
  }

  // loginByToken(token: string) {
  //   this.loginService.onReload(token);
  // }
}
