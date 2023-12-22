import { Component, OnDestroy, OnInit } from '@angular/core';
import { Alert, AlertType } from '../../interfaces/alert';
import { AlertService } from '../../services/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {

  AlertType = AlertType;
  alerts: Alert[] = [];
  alertSubscription!: Subscription;

  constructor (private alertService: AlertService) {}

  ngOnInit() {
    this.alertSubscription = this.alertService.getAlerts().subscribe((alert) => {
      if (!this.alerts.includes(alert)) {
        this.alerts.push(alert);
        setTimeout(() => {
          this.alerts = this.alerts.filter((x) => x != alert);
        }, 3000)
      } else {
        this.alerts = this.alerts.filter((x) => x != alert);
      }
    });
  }

  ngOnDestroy() {
    this.alertSubscription.unsubscribe();
  }

  onClose(alert: Alert) {
    this.alertService.close(alert);
  }

  


}
