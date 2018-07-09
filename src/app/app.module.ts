import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PerguntaModule } from './pergunta/pergunta.module';
import { FormularioModule } from './formulario/formulario.module';
import { CampanhaModule } from './campanha/campanha.module';
import { ContatoModule } from './contato/contato.module';
import { AtendimentoModule } from './atendimento/atendimento.module';
import { PerguntaMainComponent } from './pergunta/pergunta-main/pergunta-main.component';
import { FormularioMainComponent } from './formulario/formulario-main/formulario-main.component';
import { CampanhaMainComponent } from './campanha/campanha-main/campanha-main.component';
import { AtendimentoMainComponent } from './atendimento/atendimento-main/atendimento-main.component';

const routes: Routes = [
  { path: 'perguntas', component: PerguntaMainComponent },
  { path: 'formularios', component: FormularioMainComponent },
  { path: 'campanhas', component: CampanhaMainComponent },
  { path: 'atendimento', component: AtendimentoMainComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    
    CoreModule,
    PerguntaModule,
    FormularioModule,
    CampanhaModule,
    ContatoModule,
    AtendimentoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
