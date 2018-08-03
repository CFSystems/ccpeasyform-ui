import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { Pergunta, Opcao } from '../core/model';
import { environment } from '../../environments/environment';
import { FactoryHttp } from '../seguranca/factory-http';

export class PerguntaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PerguntaService {

  perguntaUrl: string;
  opcaoUrl: string;

  private pergunta = new Pergunta();

  constructor(private http: FactoryHttp) {
    this.perguntaUrl = `${environment.apiUrl}/pergunta`;
    this.opcaoUrl = `${environment.apiUrl}/opcao`;
  }

  pesquisarPergunta(filtro: PerguntaFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    })

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.perguntaUrl}?`, { params })
      .toPromise()
      .then(response => {
        const perguntas = response.content;

        const resultado = {
          perguntas,
          total: response.totalElements
        };

        return resultado;
      })
  }

  pesquisarPerguntaPorId(id: number): Promise<any> {
    return this.http.get(`${this.perguntaUrl}/${id}`)
      .toPromise()
      .then(response => {
        const resultado = response;
        return resultado;
      })
  }

  listarTodas(): Promise<any> {
    return this.http.get<any>(`${this.perguntaUrl}/listar`)
      .toPromise()
      .then(response => response);
  }

  adicionarPergunta(pergunta: Pergunta): Promise<Pergunta> {
    return this.http.post<Pergunta>(this.perguntaUrl, pergunta)
      .toPromise()
      .then(response => {
        const resultado = response;
        return resultado;
      })
  }

  adicionarOpcao(opcao: Opcao): Promise<Opcao> {
    return this.http.post<Opcao>(this.opcaoUrl, opcao)
      .toPromise()
      .then(response => {
        const resultado = response;
        return resultado;
      });
  }

  atualizarPergunta(pergunta: Pergunta): Promise<Pergunta> {
    return this.http.put<Pergunta>(`${this.perguntaUrl}/${pergunta.id}`, pergunta)
      .toPromise()
      .then(response => {
        const perguntaAlterada = response;
        return perguntaAlterada;
      });
  }

  editarPergunta(pergunta: Pergunta) {
    this.pergunta = pergunta;
  }

  excluirPergunta(id: number): Promise<void> {
    return this.http.delete(`${this.perguntaUrl}/${id}`)
      .toPromise()
      .then(() => null);
  }

}
