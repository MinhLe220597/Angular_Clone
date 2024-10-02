import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { JwtAuth } from '../../models/auth-models/jwtAuth';
import { Login } from '../../models/auth-models/login';
import { Register } from '../../models/auth-models/register';
import { Store } from '@ngrx/store';
import * as UserActions from '../../services/ngrx-store/user/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl = '';
  error = '';

  loginDto = new Login();
  registerDto = new Register();
  jwtDto = new JwtAuth();

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NzModalService,
    private store: Store<any>
  )
  {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    this.loginForm.controls['email'].setValue('minhle2205@gmail.com');
    this.loginForm.controls['password'].setValue('P@ssword123');
  }

  get formLG(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  validateLogin(): void {
    if (!this.loginForm.valid) {
      Object.values(this.loginForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      return;
    }
  }

  onSubmit() {
    this.validateLogin();
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    let dataLogin = this.loginForm.value;
    this.loginDto.email = dataLogin['email'];
    this.loginDto.password = dataLogin['password'];

    this.store.dispatch(new UserActions.Login(this.loginDto));
  }
}
