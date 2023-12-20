import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/features/dashboard/services/user.service';
import { Flowbite } from 'src/app/shared/util/flowbit-fix';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
@Flowbite()
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
