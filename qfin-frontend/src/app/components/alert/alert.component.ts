import { Component, Input } from '@angular/core';

export enum STATUS {
  SUCCESS,
  FAILURE,
  INFO,
  WARNING
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  @Input() message: string = '';
  @Input() status: STATUS = STATUS.INFO;

}
