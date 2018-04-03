import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';

import { AuthenticationComponent } from './authentication.component';
import { SignInComponent } from '../sign-in/sign-in.component';
@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule
  ],
  declarations: [
    AuthenticationComponent,
    SignInComponent
  ]
})
export class AuthenticationModule { }
