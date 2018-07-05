import { Component, OnInit, ViewChild } from '@angular/core';

import { MessageService } from 'primeng/components/common/messageservice';
import { LazyLoadEvent } from 'primeng/components/common/api';

import { FormularioFiltro, FormularioService } from '../formulario.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Formulario } from '../../core/model';


@Component({
  selector: 'app-formulario-search',
  templateUrl: './formulario-search.component.html',
  styleUrls: ['./formulario-search.component.css']
})
export class FormularioSearchComponent implements OnInit {

  totalRegistros = 0;
  filtro = new FormularioFiltro();
  formularios = [];
  perguntas = [];
  @ViewChild('tabela') grid;

  formularioEdit = new Formulario();
  editando: boolean;

  constructor(
    private formularioService: FormularioService,
    private errorService: ErrorHandlerService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    if (this.filtro.pagina === 0) {
      this.grid.first = 0;
    }

    this.formularioService.pesquisarFormulario(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.formularios = resultado.formularios;
      })
      .catch(erro => this.errorService.handle(erro)
      );
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  displayInfo: boolean = false;
  showDialogInfo(perguntas: any) {
    this.displayInfo = true;
    this.perguntas = perguntas;
  }

  display: boolean = false;
  abrirDialogFormulario(editando: boolean, id: number) {
    this.editando = editando;
    this.display = true;
    if(editando){
      this.formularioService.pesquisarFormularioPorId(id)
      .then(resultado => {
        this.formularioEdit = resultado;
      })
      .catch(erro => this.errorService.handle(erro)
      );
    }
  }

  fecharDialogFormulario(display: boolean){
    this.display = display;
    this.pesquisar();
  }

  alternarStatus(formulario: any): void {
    const novoStatus = formulario.ativo;
    
    this.formularioService.mudarStatus(formulario.id, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativado' : 'desativado';

        formulario.ativo = novoStatus;
        this.messageService.add({ severity: 'success', detail: 'Formulário ' + acao + ' com sucesso!'})
      })
      .catch(erro => this.errorService.handle(erro));
  }

}
