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

  qtdOpcoes = [
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
  ];

  qtd: number;
  opcao: string;

  respostaTipo: String;
  idPerguntaSalva: number;
  perguntaSalva: boolean = false;

  pergunta = new Pergunta();
  listaOpcao = [];

  constructor(
    private perguntaService: PerguntaService,
    private messageService: MessageService,
    private errorService: ErrorHandlerService,
    private perguntaSearch: PerguntaSearchComponent
  ) { }

  ngOnInit() {
  }

  salvarPergunta(form: FormControl) {
    this.respostaTipo = this.pergunta.tipo;
    this.perguntaSalva = true;
    console.log(this.perguntaSalva);
    //this.perguntaService.adicionarPergunta(this.pergunta)
    //  .then(resultado => {
    //    this.idPerguntaSalva = resultado.id;
    //    this.perguntaSalva = true;
    //    this.messageService.add({ severity: 'success', detail: 'Pergunta adicionada com sucesso!' });
    //    this.pergunta = new Pergunta();
    //    this.fecharDialog(form);
    //  })
    //  .catch(erro => this.errorService.handle(erro)
    //  );
  }

  //salvarOpcoes(form: FormControl){
  //  
  //}

  fecharDialog(form: FormControl) {
    form.reset();
    this.perguntaSearch.display = false;
  }

  escrever() {
    this.listaOpcao.push(
      { nome: this.opcao }
    )
    console.log(this.listaOpcao.toString);
  }

}
