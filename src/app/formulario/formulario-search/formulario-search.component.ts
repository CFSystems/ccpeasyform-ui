import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { MessageService } from 'primeng/components/common/messageservice';
import { LazyLoadEvent } from 'primeng/components/common/api';

import { FormularioFiltro, FormularioService } from '../formulario.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-formulario-search',
  templateUrl: './formulario-search.component.html',
  styleUrls: ['./formulario-search.component.css']
})
export class FormularioSearchComponent implements OnInit {

  totalRegistros = 0;
  filtro = new FormularioFiltro();
  perguntas = [];
  @ViewChild('tabela') grid;

  @Input() formularios = [];

  @Output() displayFormularioSearch = new EventEmitter();
  @Output() formulario = new EventEmitter();

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

  fecharDialogFormularioSearch(display: boolean, formulario: any){
    this.displayFormularioSearch.emit(display);
    this.formulario.emit(formulario);
  }

}
