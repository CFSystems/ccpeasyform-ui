import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Contato } from '../core/model';

export class ContatoFiltro {
  nome: string;
  cpf: string;
  identificador: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  contatoUrl: string;

  constructor(private http: Http) {
    this.contatoUrl = `${environment.apiUrl}/ccpeasyform-api/contato`;
  }

  pesquisarContato(filtro: ContatoFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();

    headers.append('Authorization', 'Basic YWRtaW5AY2ZzeXN0ZW1zLmNvbTphZG1pbg==');

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    if (filtro.cpf) {
      params.set('cpf', filtro.cpf);
    }

    if (filtro.identificador) {
      params.set('identificador', filtro.identificador);
    }

    return this.http.get(`${this.contatoUrl}?`, { headers, search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();

        const resultado = {
          contatos: responseJson.content,
          total: responseJson.totalElements
        };

        return resultado;
      })
  }

  pesquisarContatoPorId(id: number): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AY2ZzeXN0ZW1zLmNvbTphZG1pbg==');

    return this.http.get(`${this.contatoUrl}/${id}`, { headers })
      .toPromise()
      .then(response => {
        const resultado = response.json();
        return resultado;
      })
  }

  adicionarContato(formulario: Contato): Promise<Contato> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AY2ZzeXN0ZW1zLmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.contatoUrl,
      JSON.stringify(formulario), { headers })
      .toPromise()
      .then(response => {
        const resultado = response.json();
        return resultado;
      })
  }

}
