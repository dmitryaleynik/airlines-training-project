import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.template.html',
  styleUrls: ['./header.styles.less'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean;

  constructor(public authService: AuthorizationService) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
  }
}
