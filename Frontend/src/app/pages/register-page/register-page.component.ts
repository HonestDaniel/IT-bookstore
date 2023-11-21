import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy{
  hide: boolean = true;

  form: FormGroup
  sub: Subscription

  constructor(private auth: AuthService,
              private router: Router
              ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable()
    this.sub = this.auth.register(this.form.value).subscribe((data) => {
      localStorage.setItem('currentUser', JSON.stringify(this.form.value));
      this.router.navigate(['/login'], {
        queryParams: {
          registered: true
        }
      })
    })
  }
}
