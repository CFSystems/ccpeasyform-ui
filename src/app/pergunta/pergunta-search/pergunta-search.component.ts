import { Component, OnInit, ViewChild } from '@angular/core';

import { LazyLoadEvent, ConfirmationService } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { PerguntaService, PerguntaFiltro } from '../pergunta.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-pergunta-search',
  templateUrl: './pergunta-search.component.html',
  styleUrls: ['./pergunta-search.component.css']
})
export class PerguntaSearchComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PerguntaFiltro();
  perguntas = [];
  @ViewChild('tabela') grid;

  constructor(
    private perguntaService: PerguntaService,
    private errorService: ErrorHandlerService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
  ) { }

  ngOnInit(
  ) { }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    if (this.filtro.pagina === 0) {
      this.grid.first = 0;
    }

    this.perguntaService.pesquisar(this.filtro)
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
    this.perguntaService.excluir(pergunta.id)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
          this.pesquisar();
        }

        this.messageService.add({severity:'sucess', detail: 'Pergunta ' + pergunta.id + ' - ' + pergunta.nome + ' excluída com sucesso!'});
      })
      .catch(erro => this.errorService.handle(erro)
    );
  }

}
