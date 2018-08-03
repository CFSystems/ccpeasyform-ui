import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';

import { Campanha, CampanhaFormulario } from '../../core/model';
import { CampanhaService } from '../campanha.service';
import { FormularioService } from '../../formulario/formulario.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-campanha-add',
  templateUrl: './campanha-add.component.html',
  styleUrls: ['./campanha-add.component.css']
})
export class CampanhaAddComponent implements OnInit {

  formulariosSource = [];
  campanhaFormulario = new CampanhaFormulario();
  
  @Input() formulariosTarget = [];
  @Input() campanha = new Campanha();
  @Input() editando: boolean;

  @Output() displayDialog = new EventEmitter;

  constructor(
    private campanhaService: CampanhaService,
    private formularioService: FormularioService,
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

  adicionarCampanha(form: FormControl) {
    this.campanha.status = "Pendente";
    this.campanhaService.adicionarCampanha(this.campanha)
      .then(resultado => {
        this.campanha = resultado;
        for(let form of this.formulariosTarget){
          this.campanhaFormulario.id = {
            idCampanha: this.campanha.id,
            idFormulario: form.id
          }
          this.campanhaFormulario.ordem = this.formulariosTarget.indexOf(form);
          this.campanhaService.adicionarCampanhaFormulario(this.campanhaFormulario)
            .then()
            .catch(erro => this.errorService.handle(erro))
        }
        this.messageService.add({ severity: 'success', detail: 'Campanha adicionada com sucesso!' });
        this.finalizar(form);
      })
      .catch(erro => this.errorService.handle(erro));
  }
  
  atualizarCampanha(form: FormControl) {
    this.campanhaService.atualizarCampanha(this.campanha)
      .then(resultado => {
        this.campanha = resultado;
        this.campanhaService.excluirCampanhaFormulario(this.campanha.id)
          .then(() => {
            for (let form of this.formulariosTarget) {
              this.campanhaFormulario.id = {
                idCampanha: this.campanha.id,
                idFormulario: form.id
              }
              this.campanhaFormulario.ordem = this.formulariosTarget.indexOf(form);
              this.campanhaService.adicionarCampanhaFormulario(this.campanhaFormulario)
                .then()
                .catch(erro => this.errorService.handle(erro))
            }
            this.messageService.add({ severity: 'success', detail: 'Campanha atualizada com sucesso!' });
            this.finalizar(form);
          })
          .catch(erro => this.errorService.handle(erro))
      })
      .catch(erro => this.errorService.handle(erro));
  }
  
  finalizar(form: FormControl) {
    form.reset();
    this.formulariosTarget = [];
    this.campanha = new Campanha();
    this.campanhaFormulario = new CampanhaFormulario();
    this.carregarFormularios();
    this.displayDialog.emit(false);
  }
}
