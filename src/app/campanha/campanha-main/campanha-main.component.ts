import { Component, OnInit, ViewChild } from '@angular/core';

import { MessageService } from 'primeng/components/common/messageservice';
import { LazyLoadEvent } from 'primeng/components/common/api';

import { CampanhaFiltro, CampanhaService } from '../campanha.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Campanha } from '../../core/model';

@Component({
  selector: 'app-campanha-main',
  templateUrl: './campanha-main.component.html',
  styleUrls: ['./campanha-main.component.css']
})
export class CampanhaMainComponent implements OnInit {

  totalRegistros = 0;
  filtro = new CampanhaFiltro();
  campanhas = [];
  formularios = [];
  @ViewChild('tabela') grid;

  campanhaEdit = new Campanha();
  editando: boolean;

  constructor(
    private campanhaService: CampanhaService,
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

  displayInfo: boolean = false;
  showDialogInfo(formularios: any) {
    this.displayInfo = true;
    this.formularios = formularios;
  }

  display: boolean = false;
  abrirDialogCampanha(editando: boolean, id: number) {
    this.editando = editando;
    this.display = true;
    if(editando){
      this.campanhaService.pesquisarCampanhaPorId(id)
      .then(resultado => {
        this.campanhaEdit = resultado;
      })
      .catch(erro => this.errorService.handle(erro)
      );
    }
  }

  fecharDialogCampanha(display: boolean){
    this.display = display;
    this.pesquisar();
  }

  atualizarStatus(campanha: any): void {
    this.campanhaService.mudarStatus(campanha.id)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Status da campanha ' +campanha.nome+ ' alterado com sucesso!'})
        this.pesquisar(this.filtro.pagina);
      })
      .catch(erro => this.errorService.handle(erro));
  }

}
