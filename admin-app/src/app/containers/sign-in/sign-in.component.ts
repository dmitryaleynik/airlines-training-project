import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';

import { SignInRequest } from '../../classes/sign-in.request';
import { SignInResponse } from '../../classes/sign-in.response';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.template.html',
  styleUrls: ['./sign-in.styles.less'],
})
export class SignInComponent implements OnInit {
  user: SignInRequest = new SignInRequest();

  constructor(private authService: AuthorizationService) {}

  ngOnInit() {}

  onSubmit = () => {
    this.authService.signIn(this.user).subscribe((res: SignInResponse) => {
      console.log('done');
    });
  }
}
