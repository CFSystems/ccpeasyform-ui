import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

import { SharedModule } from '../shared/shared.module';

import { PerguntaAddComponent } from './pergunta-add/pergunta-add.component';
import { PerguntaMainComponent } from './pergunta-main/pergunta-main.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    InputTextModule,
    ButtonModule,
    DropdownModule,
    TableModule,
    TooltipModule,
    DialogModule,
    SelectButtonModule,
    MessagesModule,
    MessageModule,

    SharedModule
  ],
  declarations: [
    PerguntaAddComponent,
    PerguntaMainComponent,
  ],
  exports: []
})
export class PerguntaModule { }
