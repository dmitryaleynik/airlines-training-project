import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './containers/sign-in/sign-in.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { NewPlaneComponent } from './containers/new-plane/new-plane.component';
import { AuthorizedGuardService } from './services/authorized-guard.service';
import { UnauthorizedGuardService } from './services/unauthorized-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [UnauthorizedGuardService],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthorizedGuardService],
  },
  {
    path: 'dashboard/new-plane',
    component: NewPlaneComponent,
    canActivate: [AuthorizedGuardService],
  },
  {
    path: 'dashboard/:category',
    component: DashboardComponent,
    canActivate: [AuthorizedGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
