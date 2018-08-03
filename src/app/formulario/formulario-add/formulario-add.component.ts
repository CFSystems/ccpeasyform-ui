import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';

import { Formulario, FormularioPergunta } from '../../core/model';
import { FormularioService } from '../formulario.service';
import { PerguntaService } from '../../pergunta/pergunta.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-formulario-add',
  templateUrl: './formulario-add.component.html',
  styleUrls: ['./formulario-add.component.css']
})
export class FormularioAddComponent implements OnInit {

  perguntasSource = [];
  formularioPergunta = new FormularioPergunta();

  @Input() perguntasTarget = [];
  @Input() formulario = new Formulario();
  @Input() editando: boolean;

  @Output() displayDialog = new EventEmitter();

  constructor(
    private formularioService: FormularioService,
    private perguntaService: PerguntaService,
    private messageService: MessageService,
    private errorService: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.carregarPerguntas();
  }

  carregarPerguntas() {
    return this.perguntaService.listarTodas()
      .then(perguntas => {
        this.perguntasSource = perguntas;
      })
      .catch(erro => this.errorService.handle(erro));
  }

  adicionarFormulario(form: FormControl) {
    this.formularioService.adicionarFormulario(this.formulario)
      .then(resultado => {
        this.formulario = resultado;
        for (let perg of this.perguntasTarget) {
          this.formularioPergunta.id = {
            idFormulario: this.formulario.id,
            idPergunta: perg.id
          }
          this.formularioPergunta.ordem = this.perguntasTarget.indexOf(perg);
          this.formularioService.adicionarFormularioPergunta(this.formularioPergunta)
            .then()
            .catch(erro => this.errorService.handle(erro))
        }
        this.messageService.add({ severity: 'success', detail: 'Formulário adicionado com sucesso!' });
        this.finalizar(form);
      })
      .catch(erro => this.errorService.handle(erro));
  }

  atualizarFormulario(form: FormControl) {
    this.formularioService.atualizarFormulario(this.formulario)
      .then(resultado => {
        this.formulario = resultado;
        this.formularioService.excluirFormularioPergunta(this.formulario.id)
          .then(() => {
            for (let perg of this.perguntasTarget) {
              this.formularioPergunta.id = {
                idFormulario: this.formulario.id,
                idPergunta: perg.id
              }
              this.formularioPergunta.ordem = this.perguntasTarget.indexOf(perg);
              this.formularioService.adicionarFormularioPergunta(this.formularioPergunta)
                .then()
                .catch(erro => this.errorService.handle(erro))
            }
            this.messageService.add({ severity: 'success', detail: 'Formulário atualizado com sucesso!' });
            this.finalizar(form);
          })
          .catch(erro => this.errorService.handle(erro))
      })
      .catch(erro => this.errorService.handle(erro));
  }

  finalizar(form: FormControl) {
    form.reset();
    this.perguntasTarget = [];
    this.formulario = new Formulario;
    this.formularioPergunta = new FormularioPergunta;
    this.carregarPerguntas();
    this.displayDialog.emit(false);
  }

}
