import { AuthService } from './../../services/auth.service';
import { RegisterRequestInterface } from './../../types/registerRequest.interface';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import {
  isSubmittedSelector,
  backendErrorsSelector,
} from './../../store/selectors';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { registerAction } from '../../store/actions/register.action';
import { Observable, of } from 'rxjs';
import { BackendErrors } from 'src/app/shared/types';

@Component({
  selector: 'mk-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted$: Observable<boolean>;
  backendErrors$: Observable<BackendErrors | null>;
  constructor(private store: Store<AppStateInterface>) {
    this.loginForm = this.createFormGroup();
    this.isSubmitted$ = this.store.pipe(select(isSubmittedSelector));
    this.backendErrors$ = this.store.pipe(select(backendErrorsSelector));
  }
  ngOnInit() {
    //this.initialValue();
  }

  initialValue() {
    // this.isSubmitted$=this.store.pipe(select(isSubmittedSelector));
    // this.backendErrors$=this.store.pipe(select(backendErrorsSelector));
  }
  createFormGroup() {
    return new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
    });
  }

  submit() {
    console.log('register login form');
    const request: RegisterRequestInterface = { user: this.loginForm.value };

     this.store.dispatch(registerAction({ request }));
  }
}
