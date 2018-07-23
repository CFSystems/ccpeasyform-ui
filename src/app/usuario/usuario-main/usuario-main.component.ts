import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/components/common/messageservice';
import { LazyLoadEvent } from 'primeng/components/common/api';

import { UsuarioFiltro, UsuarioService } from '../usuario.service';
import { Usuario } from '../../core/model';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-usuario-main',
  templateUrl: './usuario-main.component.html',
  styleUrls: ['./usuario-main.component.css']
})
export class UsuarioMainComponent implements OnInit {

  totalRegistros = 0;
  filtro = new UsuarioFiltro();
  usuarios = [];
  permissoes = [];
  @ViewChild('tabela') grid;

  usuarioEdit = new Usuario();
  editando: boolean;

  constructor(
    private usuarioService: UsuarioService,
    private errorService: ErrorHandlerService,
    private messageService: MessageService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('CCP EASY FORM - Usuários');
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    if (this.filtro.pagina === 0) {
      this.grid.first = 0;
    }

    this.usuarioService.pesquisarUsuario(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.usuarios = resultado.usuarios;
      })
      .catch(erro => this.errorService.handle(erro)
      );
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  display: boolean = false;
  abrirDialogUsuario(editando: boolean, id: number) {
    this.editando = editando;
    this.display = true;
    if(editando){
      this.usuarioService.pesquisarUsuarioPorId(id)
      .then(resultado => {
        this.usuarioEdit = resultado;
        for(let perm of this.usuarioEdit.permissoes){
          this.permissoes.push(perm.id);
        }
      })
      .catch(erro => this.errorService.handle(erro)
      );
    }
  }

  fecharDialogUsuario(display: boolean){
    this.permissoes = [];
    this.display = display;
    this.pesquisar();
  }

  alternarStatus(usuario: any): void {
    const novoStatus = usuario.ativo;
    
    this.usuarioService.mudarStatus(usuario.id, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativado' : 'desativado';

        usuario.ativo = novoStatus;
        this.messageService.add({ severity: 'success', detail: 'Usuário ' + acao + ' com sucesso!'})
      })
      .catch(erro => this.errorService.handle(erro));
  }

}
