import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private authService: AuthService) {}

  signup = new FormGroup({
    name: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
    password: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(8)]}),
  });

  onSignup() {
    const { name, email, password } = this.signup.controls;
    this.authService.signup(name.value, email.value, password.value).subscribe(() => {
      console.log('Success')
    });
  }

  get name() {
    return this.signup.get('name');
  }

  get email() {
    return this.signup.get('email');
  }

  get password() {
    return this.signup.get('password');
  }

}
