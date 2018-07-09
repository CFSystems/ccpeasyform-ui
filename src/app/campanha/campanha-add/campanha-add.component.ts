import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';

import { Campanha } from '../../core/model';
import { FormularioService } from '../../formulario/formulario.service';
import { CampanhaService } from '../campanha.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-campanha-add',
  templateUrl: './campanha-add.component.html',
  styleUrls: ['./campanha-add.component.css']
})
export class CampanhaAddComponent implements OnInit {

  formulariosSource = [];
  formulariosTarget = []
  @Input() formulariosTargetEdit = [];

  @Input() campanha = new Campanha();
  @Input() editando: boolean;

  @Output() displayDialog = new EventEmitter;

  constructor(
    private formularioService: FormularioService,
    private campanhaService: CampanhaService,
    private messageService: MessageService,
    private errorService: ErrorHandlerService
  ) { }

  ngOnInit() {
    this.carregarFormularios();
  }

  carregarFormularios() {
    return this.formularioService.listarAtivos()
      .then(formularios => {
        this.formulariosSource = formularios;
      })
      .catch(erro => this.errorService.handle(erro));
  }

  salvarCampanha(form: FormControl) {
    if(this.editando){
      this.campanha.formularios = this.formulariosTargetEdit;
    } else {
      this.campanha.formularios = this.formulariosTarget;
    }
    this.campanha.status = "Pendente";
    this.campanhaService.adicionarCampanha(this.campanha)
      .then(resultado => {
        this.messageService.add({ severity: 'success', detail: 'Campanha adicionada com sucesso!' });
        this.finalizar(form);
      })
      .catch(erro => this.errorService.handle(erro)
      );
  }

  finalizar(form: FormControl) {
    form.reset();
    this.formulariosTarget = [];
    this.formulariosTargetEdit = [];
    this.carregarFormularios();
    this.displayDialog.emit(false);
  }
}
