import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { So5Component } from './so5/so5.component';

const routes: Routes = [
   {path: 'so5', component: So5Component}  ,
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class So5MetricsRoutingModule { }
