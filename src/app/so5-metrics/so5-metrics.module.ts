import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { So5MetricsRoutingModule } from './so5-metrics-routing.module';
import { So5Component } from './so5/so5.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnlyNumberDirective } from './only-number.directive';
import { HttpClientModule } from '@angular/common/http';
import { PlatformComponent } from './platform/platform.component';
import { So5MappingComponent } from './so5-mapping/so5-mapping.component';


@NgModule({
  declarations: [So5Component, OnlyNumberDirective, PlatformComponent, So5MappingComponent],
  imports: [
    CommonModule,
    So5MetricsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class So5MetricsModule { }
