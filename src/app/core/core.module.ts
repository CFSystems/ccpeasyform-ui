import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageService } from 'primeng/components/common/messageservice';
import { GrowlModule } from 'primeng/growl';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/api';

import { NavbarComponent } from './navbar/navbar.component';
import { PerguntaService } from '../pergunta/pergunta.service';
import { ErrorHandlerService } from './error-handler.service';
import { FormularioService } from '../formulario/formulario.service';
import { CampanhaService } from '../campanha/campanha.service';

@NgModule({
  imports: [
    CommonModule,

    GrowlModule,
    ConfirmDialogModule
  ],
  declarations: [
    NavbarComponent
  ],
  exports: [
    NavbarComponent,
    GrowlModule,
    ConfirmDialogModule
  ],
  providers: [
    ErrorHandlerService,
    PerguntaService,
    FormularioService,
    CampanhaService,

    MessageService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
