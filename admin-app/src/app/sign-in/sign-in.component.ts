import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../authorization.service';

import { SignInRequest } from '../classes/sign-in.request';
import { SignInResponse } from '../classes/sign-in.response';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {
  user: SignInRequest = new SignInRequest();

  constructor(private authService: AuthorizationService) { }

  ngOnInit() {
  }

  onSubmit = () => {
    this.authService.signIn(this.user)
      .subscribe((res: SignInResponse) => {
        this.authService.setAuthToken(res.token);
        console.log('done');
      });
  }
}
