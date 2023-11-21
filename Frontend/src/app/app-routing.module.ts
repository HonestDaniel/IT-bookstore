import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {MainLayoutComponent} from "./shared/layouts/main-layout/main-layout.component";
import {RegisterPageComponent} from "./pages/register-page/register-page.component";
import {OverviewComponent} from "./pages/overview/overview.component";
import {AuthGuard} from "./shared/classes/auth.guard";
import {BookDetailsComponent} from "./pages/book-details/book-details.component";
import {CartPageComponent} from "./pages/cart-page/cart-page.component";

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent},
    ]
  },
  {
    path: '', component: MainLayoutComponent, canActivate: [AuthGuard], children: [
      {path: '', redirectTo: 'overview', pathMatch: 'full'},
      {path: 'overview', component: OverviewComponent},
      {path: 'cart', component: CartPageComponent},
      {path: 'book/:isbn13', component: BookDetailsComponent}
    ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
