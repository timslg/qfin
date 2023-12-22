import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/accounts.service';
import { TransactionsService } from '../../services/transactions.service';
import { Account } from '../../interfaces/account';
import { Transaction } from '../../interfaces/transaction';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  netWorth: number = 0;
  totalIncome: number = 0;
  totalExpense: number = 0;

  constructor (
    private accountsService: AccountService,
    private transactionsService: TransactionsService
  ) {}

  ngOnInit() {
    this.accountsService.getAccounts().subscribe((accounts) => {
      this.netWorth = accounts.reduce((partialSum, account) => partialSum + account.balance, 0);
    })
    this.transactionsService.getTransactions().subscribe((transactions) => {
      this.totalExpense = transactions.filter((transaction) => transaction.type == 'expense').reduce((partialSum, transaction) => partialSum + transaction.amount, 0);
      this.totalIncome = transactions.filter((transaction) => transaction.type == 'income').reduce((partialSum, transaction) => partialSum + transaction.amount, 0);
    })
  }

}
