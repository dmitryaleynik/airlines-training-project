import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SignInComponent } from './containers/sign-in/sign-in.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { NewPlaneComponent } from './containers/new-plane/new-plane.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { FlightsTableComponent } from './components/flights-table/flights-table.component';
import { NewFlightFormComponent } from './components/new-flight-form/new-flight-form.component';
import { HeaderComponent } from './components/header/header.component';
import { PlanesTableComponent } from './components/planes-table/planes-table.component';

import { JwtModule } from '@auth0/angular-jwt';
import { AuthorizationService } from './services/authorization.service';
import { DashboardService } from './services/dashboard.service';
import { AuthorizedGuardService } from './services/authorized-guard.service';
import { UnauthorizedGuardService } from './services/unauthorized-guard.service';

import { jwtModuleConfig } from '../config/jwtModule';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignInFormComponent,
    DashboardComponent,
    FlightsTableComponent,
    NewFlightFormComponent,
    HeaderComponent,
    PlanesTableComponent,
    NewPlaneComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: jwtModuleConfig,
    }),
  ],
  providers: [
    AuthorizationService,
    DashboardService,
    AuthorizedGuardService,
    UnauthorizedGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
