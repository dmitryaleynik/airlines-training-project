import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';

import { SignInComponent } from '../sign-in/sign-in.component';
import { SignInFormComponent } from '../sign-in-form/sign-in-form.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthenticationRoutingModule
  ],
  declarations: [
    SignInComponent,
    SignInFormComponent
  ]
})
export class AuthenticationModule { }
