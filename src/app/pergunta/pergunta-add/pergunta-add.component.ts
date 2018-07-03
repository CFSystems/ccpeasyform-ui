import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Pergunta, Opcao } from '../../core/model';
import { PerguntaService } from '../pergunta.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { PerguntaSearchComponent } from '../pergunta-search/pergunta-search.component';

@Component({
  selector: 'app-pergunta-add',
  templateUrl: './pergunta-add.component.html',
  styleUrls: ['./pergunta-add.component.css']
})
export class PerguntaAddComponent implements OnInit {

  tipos = [
    { label: 'Resposta Única', value: 'RespostaUnica' },
    { label: 'Múltipla Escolha', value: 'MultiplaEscolha' },
    { label: 'Texto', value: 'Texto' }
  ];

  opcaoAdd: string;
  listaOpcao = [];
  opcao = new Opcao();

  pergunta = new Pergunta();
  idPerguntaSalva: number;

  constructor(
    private perguntaService: PerguntaService,
    private messageService: MessageService,
    private errorService: ErrorHandlerService,
    private perguntaSearch: PerguntaSearchComponent
  ) { }

  ngOnInit() {
  }

  salvarPergunta(form: FormControl) {
    this.perguntaService.adicionarPergunta(this.pergunta)
      .then(resultado => {
        this.idPerguntaSalva = resultado.id;
        if(this.listaOpcao.length != 0 && this.pergunta.tipo != "Texto") {
          this.salvarOpcoes(form);
        } else {
          this.pergunta = new Pergunta();
          this.messageService.add({ severity: 'success', detail: 'Pergunta adicionada com sucesso!' });
          this.fecharDialog(form);
          this.perguntaSearch.pesquisar();
        }
      })
      .catch(erro => this.errorService.handle(erro)
    );
  }
  
  salvarOpcoes(form: FormControl) {
    for (let op of this.listaOpcao) {
      this.pergunta = new Pergunta();
      this.opcao.nome = op;
      this.pergunta.id = this.idPerguntaSalva;
      this.opcao.pergunta = this.pergunta;
      this.perguntaService.adicionarOpcao(this.opcao)
        .then(() => {
          this.pergunta = new Pergunta();
          this.opcao = new Opcao ();
        })
        .catch(erro => this.errorService.handle(erro)
        );
    }
    this.messageService.add({ severity: 'success', detail: 'Pergunta e opções adicionadas com sucesso!' });
    this.fecharDialog(form);
    this.perguntaSearch.pesquisar();
  }

  fecharDialog(form: FormControl) {
    form.reset();
    this.listaOpcao = [];
    this.perguntaSearch.display = false;
  }

  adicionarOpcao() {
    if(this.opcaoAdd != undefined){
      this.listaOpcao.push(this.opcaoAdd);
      this.opcaoAdd = undefined;
    } else {
      this.messageService.add({ severity: 'warning', detail: 'O campo Opção precisa ser preenchido!' });
    }
  }

  excluirOpcao(nome: string) {
    const index = this.listaOpcao.indexOf(nome);
    this.listaOpcao.splice(index, 1);
  }
}
