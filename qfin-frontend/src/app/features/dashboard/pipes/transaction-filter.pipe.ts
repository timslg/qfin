import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../interfaces/transaction';
import { SelectOption } from '../interfaces/select-option';


@Pipe({
  name: 'transactionFilter',
  pure: false
})
export class TransactionFilterPipe implements PipeTransform {
  transform(transactions: Transaction[], accountSelectOptions: SelectOption[]): Transaction[] {
    const checkedAccountIds = accountSelectOptions.filter((option) => option.checked).map((option) => option.value);
    return transactions.filter((transaction) => checkedAccountIds.includes(transaction.account._id));
  }
}