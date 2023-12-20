import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  showError: boolean = false;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  signin = new FormGroup({
    email: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    password: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
  });

  onSignin() {
    const { email, password } = this.signin.controls;
    this.authService.singin(email.value, password.value).subscribe({
      next: (data) => {
        this.showError = false;
        const returnUrl = this.route.snapshot.queryParams['redirect'] || '/dashboard';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        this.showError = true;
        this.signin.controls.password.reset();
      },
    });
  }

}
