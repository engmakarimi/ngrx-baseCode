import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendErrorMessageComponent } from './components/backend-error-message/backend-error-message.component';
import { NavComponent } from './components/nav/nav.component';


const COMPONENTS = [BackendErrorMessageComponent,NavComponent];
@NgModule({
  declarations: [COMPONENTS],
  imports: [
    CommonModule,AppRoutingModule

  ],
  exports:[COMPONENTS]
})
export class SharedModule {}
