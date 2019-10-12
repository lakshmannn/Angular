import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WelcomeComponent} from './components/welcome/welcome.component';

import { AuthGuard } from './auth/auth.guard';

import { So5Component } from './so5-metrics/so5/so5.component';
import { PlatformComponent } from './so5-metrics/platform/platform.component';
import { LoginComponent } from './components/login/login.component';



const routes: Routes = [
  {path: 'SO5AgileMetrics', component: So5Component
  //: [AuthGuard]
  },
  {path: 'SO5AgileMetrics', component: So5Component,
  canActivate: [AuthGuard]
  },

  {path: '', component: LoginComponent},
  {path: 'Platform', component: PlatformComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
