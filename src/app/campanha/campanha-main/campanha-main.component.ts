import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

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
  campFormularios = [];

  campanha = new Campanha();
  @ViewChild('tabela') grid;
  editando: boolean;

  constructor(
    private campanhaService: CampanhaService,
    private errorService: ErrorHandlerService,
    private messageService: MessageService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('CCP EASY FORM - Campanhas');
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
  showDialogInfo(campanha: Campanha) {
    this.carregarFormulariosPorCampanha(campanha);
    this.displayInfo = true;
  }

  display: boolean = false;
  abrirDialogCampanha(editando: boolean, campanha: Campanha) {
    this.editando = editando;
    this.display = true;
    if (this.editando) {
      this.carregarFormulariosPorCampanha(campanha);
    } else {
      this.campanha = new Campanha();
      this.formularios = [];
    }
  }

  fecharDialogCampanha(display: boolean) {
    this.display = display;
    this.pesquisar();
  }

  atualizarStatus(campanha: any): void {
    this.campanhaService.mudarStatus(campanha.id)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Status da campanha ' + campanha.nome + ' alterado com sucesso!' })
        this.pesquisar(this.filtro.pagina);
      })
      .catch(erro => this.errorService.handle(erro));
  }

  carregarFormulariosPorCampanha(campanha: Campanha) {
    this.campFormularios = [];
    this.formularios = [];
    this.campanha = new Campanha();
    this.campanha = campanha;
    this.campFormularios = this.campanha.campanhaFormulario;
    this.campFormularios.sort(function (obj1, obj2) {
      return obj1.ordem - obj2.ordem;
    })
    for (let form of this.campFormularios) {
      this.formularios.push(form.formulario);
    }
  }

}
