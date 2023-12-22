import { Injectable } from '@angular/core';
import { Alert, AlertType } from '../interfaces/alert';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    private alertSubject = new Subject<Alert>();

    constructor() { }

    public getAlerts(): Observable<Alert> {
        return this.alertSubject.asObservable();
    }

    private alert(type: AlertType, message: string) {
        this.alertSubject.next({
            id: new Date().valueOf(),
            type,
            message
        });
    }

    public success(message: string) {
        this.alert(AlertType.Success, message);
    }

    public error(message: string) {
        this.alert(AlertType.Error, message);
    }

    public close(alert: Alert) {
        this.alertSubject.next(alert);
    }

  
}
