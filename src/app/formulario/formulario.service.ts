import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Formulario } from '../core/model';
import { FactoryHttp } from '../seguranca/factory-http';

export class FormularioFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class FormularioService {

  formularioUrl: string;

  private formulario = new Formulario;

  constructor(private http: FactoryHttp) {
    this.formularioUrl = `${environment.apiUrl}/formulario`;
  }

  pesquisarFormulario(filtro: FormularioFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
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

  adicionarFormulario(formulario: Formulario): Promise<Formulario> {
    return this.http.post<Formulario>(this.formularioUrl, formulario)
      .toPromise()
      .then(response => {
        const resultado = response;
        return resultado;
      })
  }

  atualizarFormulario(formulario: Formulario): Promise<Formulario> {
    return this.http.put<Formulario>(`${this.formularioUrl}/${formulario.id}`, formulario)
      .toPromise()
      .then(response => {
        const formularioAlterado = response;
        return formularioAlterado;
      });
  }

  mudarStatus(id: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
    return this.http.put(`${this.formularioUrl}/${id}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }

  listarAtivos(): Promise<any> {
    let params = new HttpParams();
    params = params.set('ativo', 'true');
    
    return this.http.get<any>(`${this.formularioUrl}?`, { params })
      .toPromise()
      .then(response => response.content);
  }

}
