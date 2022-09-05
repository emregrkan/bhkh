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

  ngOnInit(): void {
    this.authService.getTestUsers().subscribe({
      next: (users) => console.log(users),
    });
  }

  onSubmit() {
    if (!this.emailAndPaswordModel.email) {
      alert('E-posta boş olamaz');
      return;
    }

    if (!this.emailAndPaswordModel.password) {
      alert('Şifre boş olamaz');
      return;
    }

    this.authService.signIn(this.emailAndPaswordModel).subscribe({
      next: (tokens) => console.log(tokens),
      error: (error) => {
        if (error.status === 401) {
          alert('E-postanız veya şifreniz doğru değil.');
        }
      },
      complete: () =>
        this.authService.getTestUsers().subscribe({
          next: (value) => console.log(value),
        }),
    });
  }
}
