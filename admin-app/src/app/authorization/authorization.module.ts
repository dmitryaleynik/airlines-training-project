import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthorizationRoutingModule } from './authorization-routing.module';

import { SignInComponent } from '../sign-in/sign-in.component';
import { SignInFormComponent } from '../sign-in-form/sign-in-form.component';
import { AuthorizationService } from '../authorization.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthorizationRoutingModule
  ],
  declarations: [
    SignInComponent,
    SignInFormComponent
  ],
  providers: [AuthorizationService]
})
export class AuthorizationModule { }
