import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/accounts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { TransactionsService } from '../../services/transactions.service';
import { Account } from '../../interfaces/account';
import { SelectOption } from '../../interfaces/select-option';

@Component({
  selector: 'app-transactions-edit',
  templateUrl: './transactions-edit.component.html',
  styleUrls: ['./transactions-edit.component.css']
})
export class TransactionsEditComponent {

  transactionFormGroup!: FormGroup;
  transactionId!: string | null;
  accounts: Account[] = [];
  accountSelectOptions: SelectOption[] = [];

  constructor (
    private transactionService: TransactionsService,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    const param_id = this.route.snapshot.paramMap.get('id');
    this.transactionId = param_id != 'create' ? param_id : null;

    this.accountService.getAccounts().subscribe((accounts) => {
      this.accounts = accounts;
      this.accountSelectOptions = this.accounts.map(account => ({ name: account.name, value: account._id, checked: true}));
    });

    this.transactionFormGroup = this.formBuilder.group({
      name: [null, { validators: [Validators.required] }],
      type: ['expense', { validators: [Validators.required] }],
      account: [null, { validators: [Validators.required] }],
      amount: [null, { validators: [Validators.required], updateOn: 'blur'}],
      date: [new Date().toISOString().split('T')[0], { validators: [Validators.required]}]
    });
    
    if (this.transactionId) {
      this.transactionService.getTransaction(this.transactionId).subscribe({
        next: (transaction) => {
          console.log(transaction)
          this.transactionFormGroup.patchValue(transaction);
        },
        error: (error) => {
          this.router.navigate(['/dashboard/transactions']);
        }
      });
    }

  }

  public onCreate() {
    if (!this.transactionId) {
      this.transactionService.createTransaction(this.transactionFormGroup.value).subscribe({
        next: (transaction) => {
          this.alertService.success('Transaction successfully created.')
          this.router.navigate(['/dashboard/transactions']);
        }
      });
    }
  }

  public onUpdate() {
    if (this.transactionId) {
      this.transactionService.updateTransaction(this.transactionId, this.transactionFormGroup.value).subscribe({
        next: (transaction) => {
          this.alertService.success('Transaction successfully updated.')
          this.router.navigate(['/dashboard/transactions']);
        }
      });
    }
  }

  public onDelete() {
    if (this.transactionId) {
      this.transactionService.deleteTransaction(this.transactionId).subscribe({
        next: (transaction) => {
          this.alertService.success('Transaction successfully deleted.')
          this.router.navigate(['/dashboard/transactions']);
        }
      });
    }
  }

}
