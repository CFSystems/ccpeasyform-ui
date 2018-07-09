import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';

import { SharedModule } from '../shared/shared.module';
import { ContatoSearchComponent } from './contato-search/contato-search.component';
import { ContatoAddComponent } from './contato-add/contato-add.component';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    DialogModule,
    DropdownModule,

    SharedModule
  ],
  declarations: [
    ContatoAddComponent,
    ContatoSearchComponent
  ],
  exports: [
    ContatoAddComponent,
    ContatoSearchComponent
  ]
})
export class ContatoModule { }
