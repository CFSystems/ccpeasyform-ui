import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerguntaMainComponent } from "./pergunta/pergunta-main/pergunta-main.component";
import { FormularioMainComponent } from "./formulario/formulario-main/formulario-main.component";
import { CampanhaMainComponent } from "./campanha/campanha-main/campanha-main.component";
import { AtendimentoMainComponent } from "./atendimento/atendimento-main/atendimento-main.component";
import { PaginaNaoEncontradaComponent } from "./core/pagina-nao-encontrada.component";
import { LoginFormComponent } from './seguranca/login-form/login-form.component';
import { UsuarioMainComponent } from './usuario/usuario-main/usuario-main.component';
import { AuthGuard } from './seguranca/auth-guard';
import { NaoAutorizadoComponent } from './core/nao-autorizado.component';

const routes: Routes = [
    { path: '', redirectTo: 'atendimento', pathMatch: 'full'},
    { path: 'login', component: LoginFormComponent},
    { 
      path: 'perguntas',
      component: PerguntaMainComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ADMINISTRADOR'] }
    },
    {
      path: 'formularios',
      component: FormularioMainComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ADMINISTRADOR'] }
    },
    {
      path: 'campanhas',
      component: CampanhaMainComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ADMINISTRADOR'] }
    },
    {
      path: 'atendimento',
      component: AtendimentoMainComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ADMINISTRADOR','SUPERVISOR','OPERADOR'] }
    },
    {
      path: 'usuarios',
      component: UsuarioMainComponent,
      canActivate: [AuthGuard],
      data: { roles: ['ADMINISTRADOR'] }
    },
    { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
    { path: 'nao-autorizado', component: NaoAutorizadoComponent },
    { path: '**', redirectTo: 'pagina-nao-encontrada' }
  ];
  
  @NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
  })
  export class AppRoutingModule { }
  