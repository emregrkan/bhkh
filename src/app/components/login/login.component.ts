import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { EmailAndPasswordModel } from 'src/app/models/email-and-password-model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  mailIcon: IconDefinition = faEnvelope;
  passwordIcon: IconDefinition = faLock;
  emailAndPaswordModel: EmailAndPasswordModel = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.emailAndPaswordModel.email) {
      alert('E-posta boş olamaz');
      return;
    }

    if (!this.emailAndPaswordModel.password) {
      alert('Şifre boş olamaz');
      return;
    }

    this.authService.signIn(this.emailAndPaswordModel);
  }

  async onTest() {
    const testUsers = await this.authService.getTestUsers();
    console.log(testUsers);
  }
}
