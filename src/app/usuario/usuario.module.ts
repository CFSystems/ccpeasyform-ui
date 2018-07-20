import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MultiSelectModule } from 'primeng/multiselect';

import { SharedModule } from '../shared/shared.module';
import { UsuarioMainComponent } from './usuario-main/usuario-main.component';
import { UsuarioAddComponent } from './usuario-add/usuario-add.component';

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
    MultiSelectModule,

    SharedModule
  ],
  declarations: [
    UsuarioMainComponent,
    UsuarioAddComponent
  ]
})
export class UsuarioModule { }
