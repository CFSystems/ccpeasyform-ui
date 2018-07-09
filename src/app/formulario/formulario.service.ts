import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';

import { environment } from '../../environments/environment';
import { Formulario } from '../core/model';

export class FormularioFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class FormularioService {

  formularioUrl: string;

  private formulario = new Formulario;

  constructor(private http: Http) {
    this.formularioUrl = `${environment.apiUrl}/ccpeasyform-api/formulario`;
  }

  pesquisarFormulario(filtro: FormularioFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();

    headers.append('Authorization', 'Basic YWRtaW5AY2ZzeXN0ZW1zLmNvbTphZG1pbg==');

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.formularioUrl}?`, { headers, search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();

        const resultado = {
          formularios: responseJson.content,
          total: responseJson.totalElements
        };

        return resultado;
      })
  }

  pesquisarFormularioPorId(id: number): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AY2ZzeXN0ZW1zLmNvbTphZG1pbg==');

    return this.http.get(`${this.formularioUrl}/${id}`, { headers })
      .toPromise()
      .then(response => {
        const resultado = response.json();
        return resultado;
      })
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AY2ZzeXN0ZW1zLmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.formularioUrl}/${codigo}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionarFormulario(formulario: Formulario): Promise<Formulario> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AY2ZzeXN0ZW1zLmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.formularioUrl,
      JSON.stringify(formulario), { headers })
      .toPromise()
      .then(response => {
        const resultado = response.json();
        return resultado;
      })
  }

  listarAtivos(): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();

    headers.append('Authorization', 'Basic YWRtaW5AY2ZzeXN0ZW1zLmNvbTphZG1pbg==');

    params.set('ativo', 'true');

    return this.http.get(`${this.formularioUrl}?`, { headers, search: params })
      .toPromise()
      .then(response => response.json().content);
  }

}
