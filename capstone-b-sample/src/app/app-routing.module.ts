import { AuthGuard } from './guard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {
    path: "",
    component: LandingPageComponent,
    title: "Welcome | B-SAMPLE",
  },
  {
    path: "login",
    component: LoginComponent,
    title: "Login | B-SAMPLE",
  },
  {
    path: "home",
    component: HomeComponent,
    title: "Home | B-SAMPLE",
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
