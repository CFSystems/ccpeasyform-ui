import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PerguntaModule } from './pergunta/pergunta.module';
import { FormularioModule } from './formulario/formulario.module';
import { CampanhaModule } from './campanha/campanha.module';
import { ContatoModule } from './contato/contato.module';
import { AtendimentoModule } from './atendimento/atendimento.module';
import { AppRoutingModule } from './app-routing.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { UsuarioModule } from './usuario/usuario.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    
    CoreModule,
    PerguntaModule,
    FormularioModule,
    CampanhaModule,
    ContatoModule,
    AtendimentoModule,
    SegurancaModule,
    UsuarioModule,
    AppRoutingModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/ccpeasyform-ui'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
