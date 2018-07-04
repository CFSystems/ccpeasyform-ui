import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { PerguntaService, PerguntaFiltro } from '../pergunta.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Pergunta } from '../../core/model';

@Component({
  selector: 'app-pergunta-search',
  templateUrl: './pergunta-search.component.html',
  styleUrls: ['./pergunta-search.component.css']
})
export class PerguntaSearchComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PerguntaFiltro();
  perguntas = [];
  opcoes = [];
  @ViewChild('tabela') grid;

  perguntaEdit = new Pergunta();
  editando: boolean;

  constructor(
    private perguntaService: PerguntaService,
    private errorService: ErrorHandlerService,
    private messageService: MessageService,
    private confirmation: ConfirmationService
  ) { }

  ngOnInit() {
   }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    if (this.filtro.pagina === 0) {
      this.grid.first = 0;
    }

    this.perguntaService.pesquisarPergunta(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.perguntas = resultado.perguntas;
      })
      .catch(erro => this.errorService.handle(erro)
      );
  }

  pesquisarOpcoes(id: number) {
    this.perguntaService.pesquisarOpcao(id)
      .then(resultado => {
        this.opcoes = resultado;
      })
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pergunta: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pergunta);
      }
    })
  }

  excluir(pergunta: any) {
    this.perguntaService.excluirPergunta(pergunta.id)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
          this.pesquisar();
        }

        this.messageService.add({ severity: 'sucess', detail: 'Pergunta ' + pergunta.id + ' - ' + pergunta.nome + ' excluída com sucesso!' });
      })
      .catch(erro => this.errorService.handle(erro)
      );
  }

  display: boolean = false;
  abrirDialogPergunta(editando: boolean, id: number) {
    this.editando = editando;
    this.display = true;
    if(editando){
      this.perguntaService.persquisarPerguntaPorId(id)
      .then(resultado => {
        this.perguntaEdit = resultado;
      })
      .catch(erro => this.errorService.handle(erro)
      );
    }
  }

  fecharDialogPergunta(display: boolean){
    this.display = display;
    this.pesquisar();
  }

  displayInfo: boolean = false;
  showDialogInfo(id: number) {
    this.pesquisarOpcoes(id);
    this.displayInfo = true;
  }

}