import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecruiteRoutingModule } from './route2.routing';
import { RouterModule } from '@angular/router';
import { RecruiterComponent } from './recruiter.component';



@NgModule({
  declarations: [RecruiterComponent],
  imports: [
    CommonModule,
    RecruiteRoutingModule,
    RouterModule, 
  ]
})
export class RecruiterModule { }
