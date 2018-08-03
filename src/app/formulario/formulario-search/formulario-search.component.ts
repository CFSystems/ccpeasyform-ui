import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { LazyLoadEvent } from 'primeng/components/common/api';

import { FormularioFiltro, FormularioService } from '../formulario.service';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-formulario-search',
  templateUrl: './formulario-search.component.html',
  styleUrls: ['./formulario-search.component.css']
})
export class FormularioSearchComponent implements OnInit {

  @Input() formularios = [];

  @Output() displayFormularioSearch = new EventEmitter();
  @Output() formulario = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  fecharDialogFormularioSearch(display: boolean, formulario: any){
    this.displayFormularioSearch.emit(display);
    this.formulario.emit(formulario);
  }

}
