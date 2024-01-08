import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

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

  constructor(private router: Router, private apiService: ApiService) {}

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
    this.apiService
      .post('https://freesound.org/apiv2/oauth2/access_token/', body)
      .then((res: any) => {
        this.accessToken = res.access_token;
        this.refreshToken = res.refresh_token;
        this.router.navigate(['/home']);
        // this.cookieStorageService.setCookie(this.refreshToken);
        this.userData.next(res);
        this.loggedInSubject.next(true);
      })
      .catch((err: any) => {
        alert('errore');
      });
  }

  logout() {
    this.userData.next(null);
    this.loggedInSubject.next(false);
    this.router.navigate(['login']);
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }
}
