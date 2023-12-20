import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-darkmodetoggle',
  templateUrl: './darkmodetoggle.component.html',
  styleUrls: ['./darkmodetoggle.component.css']
})
export class DarkmodetoggleComponent implements OnInit {

  public darkMode : boolean = true;

  ngOnInit(): void {
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.darkMode = false;
    } else {
      this.darkMode = true;
    }
  }

  onToggle() {
    
    this.darkMode = !this.darkMode;
    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === 'light') {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
      } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
      }

  // if NOT set via local storage previously
  } else {
      if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
      } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
      }
  }
  }

}
