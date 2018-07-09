import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

import { LazyLoadEvent } from 'primeng/components/common/api';

import { ErrorHandlerService } from '../../core/error-handler.service';
import { ContatoFiltro, ContatoService } from '../contato.service';

@Component({
  selector: 'app-contato-search',
  templateUrl: './contato-search.component.html',
  styleUrls: ['./contato-search.component.css']
})
export class ContatoSearchComponent implements OnInit {

  filtros = [
    { label: 'Nome', value: 'nome' },
    { label: 'CPF', value: 'cpf' },
    { label: 'Identificador', value: 'identificador' }
  ];

  novoContato: boolean = false;

  filtroValor: string;
  filtroOpcao: string;

  totalRegistros = 0;
  filtro = new ContatoFiltro();
  @ViewChild('tabela') grid;

  contatos = [];

  @Output() displayContatoSearch = new EventEmitter();
  @Output() contato = new EventEmitter();

  constructor(
    private contatoService: ContatoService,
    private errorService: ErrorHandlerService
  ) { }

  ngOnInit() {
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    if (this.filtro.pagina === 0) {
      this.grid.first = 0;
    }

    this.filtro.nome="";
    this.filtro.cpf="";
    this.filtro.identificador="";

    if(this.filtroOpcao === "nome") {
      this.filtro.nome = this.filtroValor;
    }

    if(this.filtroOpcao === "cpf") {
      this.filtro.cpf = this.filtroValor;
    }

    if(this.filtroOpcao === "identificador") {
      this.filtro.identificador = this.filtroValor;
    }
    
    this.contatoService.pesquisarContato(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.contatos = resultado.contatos;
      })
      .catch(erro => this.errorService.handle(erro)
      );
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  fecharDialogContatoSearch(display: boolean, contato: any){
    this.pesquisar();
    this.displayContatoSearch.emit(display);
    this.contato.emit(contato);
  }

  fecharNovoContato(novoContato: boolean){
    this.novoContato = novoContato;
    this.pesquisar();
  }
}
