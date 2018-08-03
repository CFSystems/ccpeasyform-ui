import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';

import { Campanha, Formulario, Contato, Atendimento, Usuario, Resposta } from '../../core/model';
import { AtendimentoService } from '../atendimento.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../seguranca/auth.service';

@Component({
  selector: 'app-atendimento-main',
  templateUrl: './atendimento-main.component.html',
  styleUrls: ['./atendimento-main.component.css']
})
export class AtendimentoMainComponent implements OnInit {

  atendimento = new Atendimento();
  contato = new Contato();
  campanha = new Campanha();
  usuario = new Usuario();
  resposta = new Resposta();

  formulario = new Formulario();
  campFormularios = [];
  formularios = [];
  
  formPerguntas = [];
  perguntas = [];
  
  opcoes = [];
  respostas = [];
  respostasMultiplas: string[][] = [];

  data = new Date().toLocaleDateString;

  displayCampanhaSearch: boolean = false;
  displayFormularioSearch: boolean = false;
  displayContatoSearch: boolean = false;

  campanhaSelecionada: boolean = false;
  formularioSelecionado: boolean = false;
  contatoSelecionado: boolean = false;

  constructor(
    private atendimentoService: AtendimentoService,
    private authService: AuthService,
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

  carregarContato(contato: Contato) {
    this.contato = contato;
    this.atendimento.contato = this.contato;
    this.contatoSelecionado = true;
    this.campanhaSelecionada = false;
  }

  showDialogCampanhaSearch() {
    this.displayCampanhaSearch = true;
  }

  fecharDialogCampanhaSearch(display: boolean) {
    this.displayCampanhaSearch = display;
  }

  carregarCampanha(campanha: Campanha) {
    this.campFormularios = [];
    this.formularios = [];
    this.campanha = campanha;
    this.atendimento.campanha = this.campanha;

    this.campFormularios = this.campanha.campanhaFormulario;

    this.campFormularios.sort(function (obj1, obj2) {
      return obj1.ordem - obj2.ordem;
    })
    for (let form of this.campFormularios) {
      this.formularios.push(form.formulario);
    }
    
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

  carregarFormulario(formulario: Formulario) {
    this.formPerguntas = [];
    this.perguntas = [];
    this.formulario = formulario;
    this.atendimento.formulario = this.formulario;

    this.formPerguntas = this.formulario.formularioPergunta;
    this.formPerguntas.sort(function(obj1, obj2) {
      return obj1.ordem - obj2.ordem;
    })
    for(let perg of this.formPerguntas){
      this.perguntas.push(perg.pergunta);
    }

    this.formularioSelecionado = true;
  }

  salvarAtendimento(form: FormControl) {
    this.usuario.id = this.authService.jwtPayload.id;
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
        this.resposta.atendimento = this.atendimento;
        this.resposta.pergunta = pergunta;
        for (let resp of this.respostasMultiplas[pergunta.id]) {
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
