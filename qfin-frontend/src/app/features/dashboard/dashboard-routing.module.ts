import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { AccountEditComponent } from './pages/account-edit/account-edit.component';
import { TransactionsEditComponent } from './pages/transactions-edit/transactions-edit.component';
import { OverviewComponent } from './pages/overview/overview.component';


const routes: Routes = [
  {
    path: '',
    component: OverviewComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'accounts',
    component: AccountsComponent
  },
  {
    path: 'accounts/:id',
    component: AccountEditComponent
  },
  {
    path: 'transactions',
    component: TransactionsComponent
  },
  {
    path: 'transactions/:id',
    component: TransactionsEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }