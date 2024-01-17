import { HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { CookieStorageService } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  clientId: string = 'Rrv7ZZE2gfm4XU2SfOk3';
  key: string = 'p95gu0KM1EhDEA2OlUmrJPqWQcRwjyTMUBSnImup';
  accessToken: string = '';
  refreshToken: string = '';
  userData: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private router: Router, private apiSvc: ApiService,  private cookieSvc: CookieStorageService) {
    this.restoreUser()
  }

  goToFreeSound() {
    const params = new HttpParams()
      .set('client_id', this.clientId)
      .set('response_type', 'code');
    const URL =
      'https://freesound.org/apiv2/oauth2/authorize/?' + params.toString();
    window.open(URL);
  }

  login(authcode: string) {
    const body = new HttpParams()
      .set('client_id', this.clientId)
      .set('client_secret', this.key)
      .set('grant_type', 'authorization_code')
      .set('code', authcode);
    this.apiSvc
      .post('https://freesound.org/apiv2/oauth2/access_token/', body)
      .then((res) => {
        this.accessToken = res.access_token;
        console.log(this.accessToken);
        localStorage.setItem('accessToken', this.accessToken)
        // this.refreshToken = res.refresh_token;
        localStorage.setItem('accessData', JSON.stringify(res))
        this.loggedInSubject.next(true);
        this.router.navigate(['/home']);
        // this.cookieSvc.setCookie(this.refreshToken);
        this.userData.next(res);
        // console.log(this.userData);
        // console.log(res);
      })
      .catch((err) => {
        alert('errore');
      });
  }

  // onReload(token: string) {
  //   const body = new HttpParams()
  //     .set('client_id', this.clientId)
  //     .set('client_secret', this.key)
  //     .set('grant_type', 'refresh_token')
  //     .set('refresh_token', token);
  //   console.log(body);
  //   this.apiSvc
  //     .post('https://freesound.org/apiv2/oauth2/access_token/', body)
  //     .then((res) => {
  //       this.accessToken = res.access_token;
  //       this.refreshToken = res.refresh_token;
  //       this.cookieSvc.setCookie(this.refreshToken);
  //       console.log(this.accessToken);
  //       console.log(this.refreshToken);
  //       this.userData.next(res);
  //     })
  //     .catch((err) => {
  //       alert('errore');
  //       this.logOutWithoutToken();
  //     });
  // }

  restoreUser() {
    const userJson:string|null = localStorage.getItem('accessData')
    if(!userJson) return
    const accessData = JSON.parse(userJson)
    // console.log(accessData);
    this.loggedInSubject.next(accessData)
    // console.log(this.userData);

  }

  logout() {
    localStorage.removeItem('accessData')
    this.loggedInSubject.next(false);
    // this.userData.next(null);
    this.router.navigate(['/login']);
  }

  logOutWithoutToken() {
    this.cookieSvc.deleteCookie();
    this.userData.next(null);
  }

  isLoggedIn(): boolean {
    // console.log(this.loggedInSubject.value);
    // console.log(this.userData);
    return this.loggedInSubject.value;
  }
}
