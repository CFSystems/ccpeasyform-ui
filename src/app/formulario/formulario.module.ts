import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch'
import { PickListModule } from 'primeng/picklist';

import { SharedModule } from '../shared/shared.module';
import { FormularioSearchComponent } from './formulario-search/formulario-search.component';
import { FormularioAddComponent } from './formulario-add/formulario-add.component';
import { FormularioMainComponent } from './formulario-main/formulario-main.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    DialogModule,
    InputSwitchModule,
    PickListModule,
    
    SharedModule
  ],
  declarations: [
    FormularioSearchComponent,
    FormularioAddComponent,
    FormularioMainComponent
  ],
  exports: [
    FormularioSearchComponent
  ]
})
export class FormularioModule { }
