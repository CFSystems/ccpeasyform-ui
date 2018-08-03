import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { PerguntaService, PerguntaFiltro } from '../pergunta.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Pergunta } from '../../core/model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pergunta-main',
  templateUrl: './pergunta-main.component.html',
  styleUrls: ['./pergunta-main.component.css']
})
export class PerguntaMainComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PerguntaFiltro();
  perguntas = [];
  opcoes = [];
  @ViewChild('tabela') grid;

  perguntaEdit = new Pergunta();
  editando: boolean;

  display: boolean = false;
  displayInfo: boolean = false;

  constructor(
    private perguntaService: PerguntaService,
    private errorService: ErrorHandlerService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('CCP EASY FORM - Perguntas')
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

        this.messageService.add({ severity: 'success', detail: 'Pergunta ' + pergunta.id + ' - ' + pergunta.nome + ' excluída com sucesso!' });
      })
      .catch(erro => this.errorService.handle(erro)
      );
  }

  abrirDialogPergunta(editando: boolean, id: number) {
    this.editando = editando;
    this.display = true;
    if (editando) {
      this.perguntaService.pesquisarPerguntaPorId(id)
        .then(resultado => {
          this.perguntaEdit = resultado;
        })
        .catch(erro => this.errorService.handle(erro)
        );
    }
  }

  fecharDialogPergunta(display: boolean) {
    this.display = display;
    this.pesquisar();
  }

  showDialogInfo(opcoes: any) {
    this.opcoes = opcoes;
    this.displayInfo = true;
  }

}