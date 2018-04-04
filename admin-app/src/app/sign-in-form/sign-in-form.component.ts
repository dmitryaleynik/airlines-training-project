import { Component, OnInit } from '@angular/core';
import { SignIn } from '../sign-in';
import { AuthorizationService } from '../authorization.service';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.less'],
})
export class SignInFormComponent implements OnInit {
  user: SignIn = new SignIn();
  submitted = false;

  constructor(private authService: AuthorizationService) {}

  ngOnInit() {}

  onSubmit() {
    this.submitted = true;
    this.authService.signIn(this.user).subscribe(res => console.log(res));
  }
}
