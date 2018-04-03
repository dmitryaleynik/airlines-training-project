import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.less']
})
export class SignInFormComponent implements OnInit {
  submitted = false;


  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
  }
}
