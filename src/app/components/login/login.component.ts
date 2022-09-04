import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  mailIcon: IconDefinition = faEnvelope;
  passwordIcon: IconDefinition = faLock;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.signIn({
      email: "lazziya@kv.com",
      password: "testereninkocasi"
    }).subscribe((tokens) => console.log(tokens));
  }
}
