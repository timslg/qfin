import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  showError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  signin = new FormGroup({
    email: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    password: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
  });

  onSignin() {
    const { email, password } = this.signin.controls;
    this.authService.singin(email.value, password.value).subscribe({
      next: (data) => {
        this.showError = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.showError = true;
        this.signin.controls.password.reset();
      },
    });
  }

}
