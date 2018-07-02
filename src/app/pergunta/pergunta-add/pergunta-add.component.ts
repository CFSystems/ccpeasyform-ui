import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Pergunta } from '../../core/model';
import { PerguntaService } from '../pergunta.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { ErrorHandlerService } from '../../core/error-handler.service';

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

  pergunta = new Pergunta();

  constructor(
    private perguntaService: PerguntaService,
    private messageService: MessageService,
    private errorService: ErrorHandlerService
  ) { }

  ngOnInit() {
  }

  salvar(form: FormControl){
    console.log(this.pergunta);
    this.perguntaService.adicionar(this.pergunta)
      .then(() =>{
        this.messageService.add({severity:'success', detail:'Pergunta adicionada com sucesso!'})

        form.reset();
        this.pergunta = new Pergunta();
      })
      .catch(erro => this.errorService.handle(erro)
    );
  }

}
