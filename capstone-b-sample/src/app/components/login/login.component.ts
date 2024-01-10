import { Component } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
  NgForm,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: UntypedFormGroup = new UntypedFormGroup({
    code: new UntypedFormControl('', [Validators.required]),
  });
  constructor(private loginSvc: LoginService) {}

  ngOnInit(): void {}

  login() {
    const codeControl = this.loginForm.get('code');

    if (codeControl && codeControl.value) {
      const authCode = codeControl.value;
      this.loginSvc.login(authCode);
    } else {
      // Handle the case where the code control or its value is null
    }
  }

  goToFreesound() {
    this.loginSvc.goToFreeSound();
  }

}
