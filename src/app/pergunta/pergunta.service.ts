import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Pergunta, Opcao } from '../core/model';
import { environment } from '../../environments/environment';

export class PerguntaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable()
export class PerguntaService {

  perguntaUrl: string;
  opcaoUrl: string;

  constructor(private http: Http) {
    this.perguntaUrl = `${environment.apiUrl}/ccpeasyform-api/pergunta`;
    this.opcaoUrl = `${environment.apiUrl}/ccpeasyform-api/opcao`;
  }

  pesquisar(filtro: PerguntaFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();

    headers.append('Authorization', 'Basic YWRtaW5AY2ZzeXN0ZW1zLmNvbTphZG1pbg==');

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.perguntaUrl}?`, { headers, search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();

        const resultado = {
          perguntas: responseJson.content,
          total: responseJson.totalElements
        };

        return resultado;
      })
  }

  pesquisarOpcao(id: number): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();

    headers.append('Authorization', 'Basic YWRtaW5AY2ZzeXN0ZW1zLmNvbTphZG1pbg==');

    params.set('id', id.toString());

    return this.http.get(`${this.opcaoUrl}?`, { headers, search: params })
      .toPromise()
      .then(response => {
        const resultado = response.json();
        return resultado;
      })
  }

  excluir(id: number): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AY2ZzeXN0ZW1zLmNvbTphZG1pbg==');

    return this.http.delete(`${this.perguntaUrl}/${id}`, { headers })
      .toPromise()
      .then(() => null);
  }

  adicionarPergunta(pergunta: Pergunta): Promise<Pergunta> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AY2ZzeXN0ZW1zLmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.perguntaUrl,
      JSON.stringify(pergunta), { headers })
      .toPromise()
      .then(response => {
        const resultado = response.json();
        return resultado;
      })
  }

  adicionarOpcao(opcao: Opcao): Promise<Pergunta> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AY2ZzeXN0ZW1zLmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.opcaoUrl,
      JSON.stringify(opcao), { headers })
      .toPromise()
      .then(response => response.json());
  }

}
