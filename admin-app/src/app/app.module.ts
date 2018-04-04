import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';

import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthorizationService } from './services/authorization.service';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignInFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtHelperService
  ],
  providers: [AuthorizationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
