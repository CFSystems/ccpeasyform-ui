import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MessageService } from 'primeng/components/common/messageservice';

import { UsuarioService } from '../usuario.service';
import { Usuario, Permissao } from '../../core/model';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-usuario-add',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.css']
})
export class UsuarioAddComponent implements OnInit {

  opcoes = [
    { label: 'ADMINISTRADOR', value: 1 },
    { label: 'SUPERVISOR', value: 2 },
    { label: 'OPERADOR', value: 3 }
  ];

  @Input() usuario = new Usuario();
  @Input() editando: boolean;

  @Output() displayDialog = new EventEmitter();

  permissoesSelecionadas = [];

  constructor(
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private errorService: ErrorHandlerService
  ) { }

  ngOnInit() {
  }

  salvarUsuario(form: FormControl) {
    const permissoesObj =[]
    for(let perm of this.permissoesSelecionadas){
      const permissao = new Permissao();  
      permissao.id = perm;
      permissoesObj.push(permissao);
    }
    this.usuario.permissoes = permissoesObj;
    
    if(this.editando){
      this.usuarioService.atualizarUsuario(this.usuario)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Usuário atualizado com sucesso!' });
        this.finalizar(form);
      })
      .catch(erro => this.errorService.handle(erro)
      );
    } else {
      this.usuarioService.adicionarUsuario(this.usuario)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Usuário adicionado com sucesso!' });
        this.finalizar(form);
      })
      .catch(erro => this.errorService.handle(erro)
      );
    }
    
  }

  finalizar(form: FormControl) {
    form.reset();
    this.displayDialog.emit(false);
  }

}
