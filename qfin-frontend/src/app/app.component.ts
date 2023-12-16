import { Component, OnInit } from '@angular/core';
import { TestService } from './services/test.service';

import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'qfin-frontend';
  test: String | undefined;
  
  constructor(public testService: TestService) {}

  ngOnInit(): void {
    this.showConfig();
    initFlowbite();
  }

  showConfig() {
    this.testService.getTest()
      .subscribe(data => {
        console.log(data)
        this.test = data['ping']
      });
  }
}
