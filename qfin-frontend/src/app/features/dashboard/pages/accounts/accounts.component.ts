import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/accounts.service';
import { Account } from '../../interfaces/account';
import { Flowbite } from 'src/app/shared/util/flowbit-fix';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  accounts: Account[] = []

  constructor (private accountService: AccountService) {}

  ngOnInit() {
    this.accountService.getAccounts().subscribe((accounts) => {
      this.accounts = accounts;
    })
  }

}
