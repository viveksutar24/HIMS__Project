import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRoutingModule } from './general-routing.module';
import { LandingComponent } from './landing.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LandingComponent,
    DasboardComponent
  ],
  imports: [
    CommonModule,
    GeneralRoutingModule,
    SharedModule
  ]
})
export class GeneralModule { }
