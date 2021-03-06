import { Component, OnInit, Input } from '@angular/core';
import { SignInRequest } from '../../classes/sign-in.request';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.template.html',
  styleUrls: ['./sign-in-form.styles.less'],
})
export class SignInFormComponent implements OnInit {
  @Input() user: SignInRequest;
  @Input() onSubmit: Function;

  constructor() {}

  ngOnInit() {}
}
