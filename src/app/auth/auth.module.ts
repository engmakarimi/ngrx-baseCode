import { RegisterEffect } from './store/effects/register.effect';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent, RegisterComponent } from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';
import { LoginEffect } from './store/effects/login.effects';
import { GetUserEffect } from './store/effects/getUser.effect';
const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },

];

const COMPONENTS = [RegisterComponent,LoginComponent];
@NgModule({
  declarations: [COMPONENTS],
  imports: [CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('auth',reducers),
    EffectsModule.forFeature([RegisterEffect,LoginEffect,GetUserEffect])
  ],
})
export class AuthModule {}
