 import { loginAction } from './../../store/actions/login.action';
import { isSubmittedSelector, backendErrorsSelector } from './../../store/selectors';
import { AppStateInterface } from './../../../shared/types/appState.interface';
import { BackendErrors } from './../../../shared/types/backendError';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { LoginRequestInterface } from '../../types/loginRequest.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted$: Observable<boolean>;
  backendErrors$: Observable<BackendErrors | null>;
  constructor(private store: Store<AppStateInterface>) {
    this.loginForm = this.createFormGroup();
    this.isSubmitted$ = this.store.pipe(select(isSubmittedSelector));
    this.backendErrors$ = this.store.pipe(select(backendErrorsSelector));
  }

  ngOnInit() {
  }
  createFormGroup() {
    return new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submit() {

    const request: LoginRequestInterface = { user: this.loginForm.value };
    this.store.dispatch(loginAction({ request }));
  }
}
