import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PerguntaService } from '../../pergunta/pergunta.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Formulario } from '../../core/model';
import { FormControl } from '@angular/forms';
import { FormularioService } from '../formulario.service';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-formulario-add',
  templateUrl: './formulario-add.component.html',
  styleUrls: ['./formulario-add.component.css']
})
export class FormularioAddComponent implements OnInit {

  perguntasSource = [];
  @Input() perguntasTarget = [];

  @Input() formulario = new Formulario();
  @Input() editando: boolean;

  @Output() displayDialog = new EventEmitter;

  constructor(
    private perguntaService: PerguntaService,
    private formularioService: FormularioService,
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

  salvarFormulario(form: FormControl) {
    this.formulario.perguntas = this.perguntasTarget;
    this.formularioService.adicionarFormulario(this.formulario)
      .then(resultado => {
        this.messageService.add({ severity: 'success', detail: 'Formuário adicionado com sucesso!' });
        this.finalizar(form);
      })
      .catch(erro => this.errorService.handle(erro)
      );
  }

  finalizar(form: FormControl) {
    form.reset();
    this.perguntasTarget = [];
    this.displayDialog.emit(false);
  }
}
