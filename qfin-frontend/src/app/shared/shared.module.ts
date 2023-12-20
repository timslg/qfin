import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DarkmodetoggleComponent } from './components/darkmodetoggle/darkmodetoggle.component';



@NgModule({
  declarations: [
    DarkmodetoggleComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DarkmodetoggleComponent
  ]
})
export class SharedModule { }
