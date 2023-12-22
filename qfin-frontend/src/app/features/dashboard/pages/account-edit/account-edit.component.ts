import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/accounts.service';
import { Account } from '../../interfaces/account';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit {

  accountFormGroup!: FormGroup;
  accountId!: string | null;

  constructor (
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    const param_id = this.route.snapshot.paramMap.get('id');
    this.accountId = param_id != 'create' ? param_id : null;

    this.accountFormGroup = this.formBuilder.group({
      name: [null, { validators: [Validators.required] }],
      balance: [null, { validators: [Validators.required], updateOn: 'blur'}]
    });
    
    if (this.accountId) {
      this.accountService.getAccount(this.accountId).subscribe({
        next: (account) => {
          this.accountFormGroup.patchValue(account);
        },
        error: (error) => {
          this.router.navigate(['/dashboard/accounts']);
        }
      });
    }

  }

  public onCreate() {
    if (!this.accountId) {
      this.accountService.createAccount(this.accountFormGroup.value).subscribe({
        next: (account) => {
          this.alertService.success('Account successfully created.')
          this.router.navigate(['/dashboard/accounts']);
        }
      });
    }
  }

  public onUpdate() {
    if (this.accountId) {
      this.accountService.updateAccount(this.accountId, this.accountFormGroup.value).subscribe({
        next: (account) => {
          this.alertService.success('Account successfully updated.')
          this.router.navigate(['/dashboard/accounts']);
        }
      });
    }
  }

  public onDelete() {
    if (this.accountId) {
      this.accountService.deleteAccount(this.accountId).subscribe({
        next: (account) => {
          this.alertService.success('Account successfully deleted.')
          this.router.navigate(['/dashboard/accounts']);
        }
      });
    }
  }

}
