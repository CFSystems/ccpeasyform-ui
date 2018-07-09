import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';

import { ContatoService } from '../contato.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Contato } from '../../core/model';

@Component({
  selector: 'app-contato-add',
  templateUrl: './contato-add.component.html',
  styleUrls: ['./contato-add.component.css']
})
export class ContatoAddComponent implements OnInit {

  contato = new Contato();

  @Output() atualizarTabela = new EventEmitter();

  constructor(
    private contatoService: ContatoService,
    private messageService: MessageService,
    private errorService: ErrorHandlerService
  ) { }

  ngOnInit() {
  }

  salvarContato(form: FormControl) {
    this.contatoService.adicionarContato(this.contato)
      .then(() => {
        this.contato = new Contato();
        this.messageService.add({ severity: 'success', detail: 'Contato adicionado com sucesso!' });
        this.finalizar(form);
      })
      .catch(erro => this.errorService.handle(erro)
      );
  }

  finalizar(form: FormControl) {
    form.reset();
    this.atualizarTabela.emit(false);
  }

}
