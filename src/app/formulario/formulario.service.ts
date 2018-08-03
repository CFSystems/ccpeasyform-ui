import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { Formulario, FormularioPergunta } from '../core/model';
import { FactoryHttp } from '../seguranca/factory-http';

export class FormularioFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class FormularioService {

  formularioUrl: string;
  formularioPerguntaUrl: string;

  constructor(private http: FactoryHttp) {
    this.formularioUrl = `${environment.apiUrl}/formulario`;
    this.formularioPerguntaUrl = `${environment.apiUrl}/formularioPergunta`;
  }

  pesquisarFormulario(filtro: FormularioFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.formularioUrl}?`, { params })
      .toPromise()
      .then(response => {
        const resultado = {
          formularios: response.content,
          total: response.totalElements
        };
        return resultado;
      })
  }

  pesquisarFormularioPorId(id: number): Promise<any> {
    return this.http.get<any>(`${this.formularioUrl}/${id}`)
      .toPromise()
      .then(response => {
        const resultado = response;
        return resultado;
      })
  }

  listarAtivos(): Promise<any> {
    return this.http.get<any>(`${this.formularioUrl}/listarAtivos`)
      .toPromise()
      .then(response => response);
  }

  adicionarFormulario(formulario: Formulario): Promise<Formulario> {
    return this.http.post<Formulario>(this.formularioUrl, formulario)
      .toPromise()
      .then(response => {
        const resultado = response;
        return resultado;
      })
  }

  adicionarFormularioPergunta(formularioPergunta: FormularioPergunta): Promise<FormularioPergunta> {
    return this.http.post<FormularioPergunta>(this.formularioPerguntaUrl, formularioPergunta)
      .toPromise()
      .then()
  }

  atualizarFormulario(formulario: Formulario): Promise<Formulario> {
    return this.http.put<Formulario>(`${this.formularioUrl}/${formulario.id}`, formulario)
      .toPromise()
      .then(response => {
        const resultado = response;
        return resultado;
      });
  }

  mudarStatus(id: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
    return this.http.put(`${this.formularioUrl}/${id}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }

  excluirFormularioPergunta(idFormulario: number): Promise<void> {
    return this.http.delete(`${this.formularioPerguntaUrl}/${idFormulario}`)
      .toPromise()
      .then(() => null);
  }

}