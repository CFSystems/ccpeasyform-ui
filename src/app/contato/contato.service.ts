import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { Contato } from '../core/model';
import { FactoryHttp } from '../seguranca/factory-http';

export class ContatoFiltro {
  nome: string;
  cpf: string;
  identificador: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class ContatoService {

  contatoUrl: string;

  constructor(private http: FactoryHttp) {
    this.contatoUrl = `${environment.apiUrl}/contato`;
  }

  pesquisarContato(filtro: ContatoFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    if (filtro.cpf) {
      params = params.append('cpf', filtro.cpf);
    }

    if (filtro.identificador) {
      params = params.append('identificador', filtro.identificador);
    }

    return this.http.get<any>(`${this.contatoUrl}?`, { params })
      .toPromise()
      .then(response => {
        const resultado = {
          contatos: response.content,
          total: response.totalElements
        };

        return resultado;
      })
  }

  pesquisarContatoPorId(id: number): Promise<any> {
    return this.http.get<any>(`${this.contatoUrl}/${id}`)
      .toPromise()
      .then(response => {
        const resultado = response;
        return resultado;
      })
  }

  adicionarContato(contato: Contato): Promise<Contato> {
    return this.http.post<Contato>(this.contatoUrl, contato)
      .toPromise()
      .then(response => {
        const resultado = response;
        return resultado;
      })
  }

}