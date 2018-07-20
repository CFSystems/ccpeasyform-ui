import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';

import { Campanha, Formulario, Contato, Atendimento, Usuario, Resposta } from '../../core/model';
import { AtendimentoService } from '../atendimento.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Title } from '../../../../node_modules/@angular/platform-browser';

@Component({
  selector: 'app-atendimento-main',
  templateUrl: './atendimento-main.component.html',
  styleUrls: ['./atendimento-main.component.css']
})
export class AtendimentoMainComponent implements OnInit {

  atendimento = new Atendimento();
  campanha = new Campanha();
  formulario = new Formulario();
  contato = new Contato();
  usuario = new Usuario();
  resposta = new Resposta();
  perguntas = [];
  opcoes = [];
  respostas = [];
  respostasMultiplas: string[] = [];

  data = new Date().toLocaleDateString;

  displayCampanhaSearch: boolean = false;
  displayFormularioSearch: boolean = false;
  displayContatoSearch: boolean = false;

  campanhaSelecionada: boolean = false;
  formularioSelecionado: boolean = false;
  contatoSelecionado: boolean = false;

  constructor(
    private atendimentoService: AtendimentoService,
    private messageService: MessageService,
    private errorService: ErrorHandlerService,
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('CCP EASY FORM - Atendimento');
  }


  showDialogContatoSearch() {
    this.displayContatoSearch = true;
  }

  fecharDialogContatoSearch(display: boolean) {
    this.displayContatoSearch = display;
  }

  carregarContato(contato: any) {
    this.contato = contato;
    this.atendimento.contato = this.contato;
    this.contatoSelecionado = true;
  }

  showDialogCampanhaSearch() {
    this.displayCampanhaSearch = true;
  }

  fecharDialogCampanhaSearch(display: boolean) {
    this.displayCampanhaSearch = display;
  }

  carregarCampanha(campanha: any) {
    this.campanha = campanha;
    this.atendimento.campanha = this.campanha;
    this.formulario = new Formulario();
    this.perguntas = []
    this.campanhaSelecionada = true;
    this.formularioSelecionado = false;
  }

  showDialogFormularioSearch() {
    this.displayFormularioSearch = true;
  }

  fecharDialogFormularioSearch(display: boolean) {
    this.displayFormularioSearch = display;
  }

  carregarFormulario(formulario: any) {
    this.formulario = formulario;
    this.atendimento.formulario = this.formulario;
    this.perguntas = this.formulario.perguntas;
    this.formularioSelecionado = true;
  }


  salvarAtendimento(form: FormControl) {
    this.usuario.id = 1
    this.atendimento.usuario = this.usuario;

    this.atendimentoService.adicionarAtendimento(this.atendimento)
      .then(resultado => {
        this.atendimento.id = resultado.id;
        this.salvarRespostas(form);
      })
      .catch(erro => this.errorService.handle(erro)
      );
  }

  salvarRespostas(form: FormControl) {
    for (let pergunta of this.perguntas) {
      if (pergunta.tipo === 'RespostaUnica' || pergunta.tipo === 'Texto') {
        this.resposta.atendimento = this.atendimento;
        this.resposta.pergunta = pergunta;
        this.resposta.resposta = this.respostas[pergunta.id];
        this.atendimentoService.adicionarRespostas(this.resposta)
          .then(() => {
            this.resposta = new Resposta();
          })
          .catch(erro => this.errorService.handle(erro)
          );
      }
      if (pergunta.tipo === 'MultiplaEscolha') {
        this.resposta.pergunta = pergunta;
        for (let resp of this.respostasMultiplas) {
          this.resposta.atendimento = this.atendimento;
          this.resposta.pergunta = pergunta;
          this.resposta.resposta = resp;
          this.atendimentoService.adicionarRespostas(this.resposta)
            .then(() => {
              this.resposta = new Resposta();
            })
            .catch(erro => this.errorService.handle(erro)
            );
        }
      }
    }
    this.limpar(form);
    this.messageService.add({ severity: 'success', detail: 'Atendimento adicionado com sucesso!' });
  }

  limpar(form: FormControl) {
    this.contatoSelecionado = false;
    this.campanhaSelecionada = false;
    this.formularioSelecionado = false;
    this.atendimento = new Atendimento();
    this.contato = new Contato();
    this.campanha = new Campanha();
    this.formulario = new Formulario;
    this.usuario = new Usuario;
    this.resposta = new Resposta;
    this.perguntas = [];
    this.opcoes = [];
    this.respostas = [];
    this.respostasMultiplas = [];
    form.reset;
  }

}
