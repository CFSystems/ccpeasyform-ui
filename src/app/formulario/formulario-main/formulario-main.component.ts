import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { MessageService } from 'primeng/components/common/messageservice';
import { LazyLoadEvent } from 'primeng/components/common/api';

import { FormularioFiltro, FormularioService } from '../formulario.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Formulario } from '../../core/model';

@Component({
  selector: 'app-formulario-main',
  templateUrl: './formulario-main.component.html',
  styleUrls: ['./formulario-main.component.css']
})
export class FormularioMainComponent implements OnInit {

  totalRegistros = 0;
  filtro = new FormularioFiltro();
  formularios = [];
  perguntas = [];
  formPerguntas = [];

  formulario = new Formulario();
  @ViewChild('tabela') grid;
  editando: boolean;

  constructor(
    private formularioService: FormularioService,
    private errorService: ErrorHandlerService,
    private messageService: MessageService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('CCP EASY FORM - Formulários');
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
  showDialogInfo(formulario: Formulario) {
    this.carregarPerguntasPorFormulario(formulario);
    this.displayInfo = true;
  }

  display: boolean = false;
  abrirDialogFormulario(editando: boolean, formulario: Formulario) {
    this.editando = editando;
    this.display = true;
    if (this.editando) {
      this.carregarPerguntasPorFormulario(formulario);
    } else {
      this.formulario = new Formulario();
      this.perguntas = [];
    }
  }

  fecharDialogFormulario(display: boolean) {
    this.display = display;
    this.pesquisar();
  }

  alternarStatus(formulario: any): void {
    const novoStatus = formulario.ativo;
    this.formularioService.mudarStatus(formulario.id, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativado' : 'desativado';
        formulario.ativo = novoStatus;
        this.messageService.add({ severity: 'success', detail: 'Formulário ' + acao + ' com sucesso!' })
      })
      .catch(erro => this.errorService.handle(erro));
  }

  carregarPerguntasPorFormulario(formulario: Formulario) {
    this.formPerguntas = [];
    this.perguntas = [];
    this.formulario = new Formulario();
    this.formulario = formulario;
    this.formPerguntas = this.formulario.formularioPergunta;
    this.formPerguntas.sort(function(obj1, obj2) {
      return obj1.ordem - obj2.ordem;
    })
    for(let perg of this.formPerguntas){
      this.perguntas.push(perg.pergunta);
    }
  }

}
