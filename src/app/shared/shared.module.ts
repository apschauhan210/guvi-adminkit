import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiniCardComponent } from './components/mini-card/mini-card.component';



@NgModule({
  declarations: [  
    MiniCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MiniCardComponent
  ]
})
export class SharedModule { }
