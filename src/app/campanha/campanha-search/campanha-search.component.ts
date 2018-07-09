import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';

import { MessageService } from 'primeng/components/common/messageservice';
import { LazyLoadEvent } from 'primeng/components/common/api';

import { CampanhaFiltro, CampanhaService } from '../campanha.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Campanha } from '../../core/model';

@Component({
  selector: 'app-campanha-search',
  templateUrl: './campanha-search.component.html',
  styleUrls: ['./campanha-search.component.css']
})
export class CampanhaSearchComponent implements OnInit {

  totalRegistros = 0;
  filtro = new CampanhaFiltro();
  campanhas = [];
  formularios = [];
  @ViewChild('tabela') grid;

  @Output() displayCampanhaSearch = new EventEmitter();
  @Output() campanha = new EventEmitter();

  constructor(
    private campanhaService: CampanhaService,
    private errorService: ErrorHandlerService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;
    this.filtro.status = "Em Andamento";
    if (this.filtro.pagina === 0) {
      this.grid.first = 0;
    }

    this.campanhaService.pesquisarCampanha(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.campanhas = resultado.campanhas;
      })
      .catch(erro => this.errorService.handle(erro)
      );
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  fecharDialogCampanhaSearch(display: boolean, campanha: any){
    this.displayCampanhaSearch.emit(display);
    this.campanha.emit(campanha);
  }

}
