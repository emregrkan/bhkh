import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-test-users',
  templateUrl: './test-users.component.html',
})
export class TestUsersComponent implements OnInit {
  users: any[] = [];
  constructor(private authService: AuthService) {}

  async ngOnInit() {
    this.users = (await this.authService.getTestUsers())['_embedded'].users;
  }
}
