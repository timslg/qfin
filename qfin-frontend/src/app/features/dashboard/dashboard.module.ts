import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { TableFilterSelectComponent } from './components/table-filter-select/table-filter-select.component';
import { TransactionFilterPipe } from './pipes/transaction-filter.pipe';
import { AccountEditComponent } from './pages/account-edit/account-edit.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AlertComponent } from './components/alert/alert.component';
import { TransactionsEditComponent } from './pages/transactions-edit/transactions-edit.component';
import { OverviewComponent } from './pages/overview/overview.component';


@NgModule({
  declarations: [
    DashboardComponent,
    AccountsComponent,
    HeaderComponent,
    SidebarComponent,
    ProfileComponent,
    TransactionsComponent,
    TableFilterSelectComponent,
    TransactionFilterPipe,
    AccountEditComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    TransactionsEditComponent,
    OverviewComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CurrencyPipe
  ]
})
export class DashboardModule { }
