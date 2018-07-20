import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';

import { AtendimentoMainComponent } from './atendimento-main/atendimento-main.component';
import { CampanhaModule } from '../campanha/campanha.module';
import { FormularioModule } from '../formulario/formulario.module';
import { ContatoModule } from '../contato/contato.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    FieldsetModule,
    DialogModule,
    RadioButtonModule,
    CheckboxModule,
    
    CampanhaModule,
    FormularioModule,
    ContatoModule
  ],
  declarations: [AtendimentoMainComponent],
  exports: []
})
export class AtendimentoModule { }
