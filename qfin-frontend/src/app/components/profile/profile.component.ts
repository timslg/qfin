import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User | undefined;

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.showUser();
  }

  passwordForm = new FormGroup({
    password: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(8)]})
  });

  get password() {
    return this.passwordForm.get('password');
  }

  onPasswordSave() {
    
  }

  showUser() {
    this.userService.getUser().subscribe((data) => this.user = {...data})
  }

}
