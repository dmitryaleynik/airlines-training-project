import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class AuthorizedGuardService implements CanActivate {
  constructor(
    private authService: AuthorizationService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['sign-in']);
      return false;
    }
    return true;
  }
}
