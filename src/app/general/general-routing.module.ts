import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DasboardComponent } from './dasboard/dasboard.component';
import { LandingComponent } from './landing.component';

const routes: Routes = [
  {
    path: "", component: LandingComponent,
    children: [
      { path: "dashboard",component: DasboardComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralRoutingModule { }
