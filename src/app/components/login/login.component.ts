import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  mailIcon: IconDefinition = faEnvelope;
  passwordIcon: IconDefinition = faLock;

  constructor() {}

  ngOnInit(): void {}
}
