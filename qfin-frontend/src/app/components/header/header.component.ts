import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User | undefined;

  constructor(public authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.showUser();
  }

  showUser() {
    this.userService.getUser().subscribe((data) => this.user = {...data})
  }


}
