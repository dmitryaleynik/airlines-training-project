export class SignInRequest {
  email: string;
  password: string;
  role: string;

  constructor() {
    this.role = 'admin';
  }
}
