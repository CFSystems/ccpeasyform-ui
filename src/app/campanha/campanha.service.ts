import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers } from '@angular/http';

import { environment } from '../../environments/environment';
import { Campanha } from '../core/model';

export class CampanhaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class CampanhaService {

  campanhaUrl: string;

  private campanha = new Campanha;

  constructor(private http: Http) {
    this.campanhaUrl = `${environment.apiUrl}/ccpeasyform-api/campanha`;
  }

  pesquisarCampanha(filtro: CampanhaFiltro): Promise<any> {
    const params = new URLSearchParams();
    const headers = new Headers();

    headers.append('Authorization', 'Basic YWRtaW5AY2ZzeXN0ZW1zLmNvbTphZG1pbg==');

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.campanhaUrl}?`, { headers, search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();

        const resultado = {
          campanhas: responseJson.content,
          total: responseJson.totalElements
        };

        return resultado;
      })
  }

  pesquisarCampanhaPorId(id: number): Promise<any> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AY2ZzeXN0ZW1zLmNvbTphZG1pbg==');

    return this.http.get(`${this.campanhaUrl}/${id}`, { headers })
      .toPromise()
      .then(response => {
        const resultado = response.json();
        return resultado;
      })
  }

  adicionarCampanha(campanha: Campanha): Promise<Campanha> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AY2ZzeXN0ZW1zLmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.campanhaUrl,
      JSON.stringify(campanha), { headers })
      .toPromise()
      .then(response => {
        const resultado = response.json();
        return resultado;
      })
  }

  mudarStatus(id: number): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AY2ZzeXN0ZW1zLmNvbTphZG1pbg==');

    return this.http.put(`${this.campanhaUrl}/${id}/mudarStatus`, null, { headers })
      .toPromise()
      .then(() => null);
  }
}
