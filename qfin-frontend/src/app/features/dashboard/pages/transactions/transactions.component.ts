import { Component } from '@angular/core';
import { Transaction } from '../../interfaces/transaction';
import { TransactionsService } from '../../services/transactions.service';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../services/accounts.service';
import { Account } from '../../interfaces/account';
import { SelectOption } from '../../interfaces/select-option';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent {

  transactions: Transaction[] = [];
  accounts: Account[] = [];

  accountSelectOptions: SelectOption[] = [];

  constructor (
    private transactionsService: TransactionsService,
    private accountService: AccountService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.transactionsService.transactions(this.route.snapshot.queryParamMap.get('account')).subscribe((transactions) => {
      this.transactions = transactions;
    });
    this.accountService.getAccounts().subscribe((accounts) => {
      this.accounts = accounts;
      this.accountSelectOptions = this.accounts.map(account => ({ name: account.name, value: account._id, checked: true}));
    });
  }

}
