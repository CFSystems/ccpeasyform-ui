import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

import { DashboardMainComponent } from './dashboard-main/dashboard-main.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardRepostaComponent } from './dashboard-reposta/dashboard-reposta.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    PanelModule,
    ChartModule,
    DropdownModule,
    ButtonModule,

    SharedModule
  ],
  declarations: [DashboardMainComponent, DashboardRepostaComponent]
})
export class DashboardModule { }
