import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { PickListModule } from 'primeng/picklist';
import { DropdownModule } from 'primeng/dropdown';

import { SharedModule } from '../shared/shared.module';
import { CampanhaSearchComponent } from './campanha-search/campanha-search.component';
import { CampanhaAddComponent } from './campanha-add/campanha-add.component';
import { CampanhaMainComponent } from './campanha-main/campanha-main.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    DialogModule,
    PickListModule,
    DropdownModule,
    
    SharedModule
  ],
  declarations: [
    CampanhaSearchComponent,
    CampanhaAddComponent,
    CampanhaMainComponent
  ],
  exports: [
    CampanhaSearchComponent
  ]
})
export class CampanhaModule { }
