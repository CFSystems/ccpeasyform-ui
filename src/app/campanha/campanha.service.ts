import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Campanha } from '../core/model';
import { FactoryHttp } from '../seguranca/factory-http';

export class CampanhaFiltro {
  nome: string;
  status: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class CampanhaService {

  campanhaUrl: string;

  constructor(private http: FactoryHttp) {
    this.campanhaUrl = `${environment.apiUrl}/campanha`;
  }

  pesquisarCampanha(filtro: CampanhaFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    });

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    if (filtro.status) {
      params = params.set('status', filtro.status);
    }

    return this.http.get<any>(`${this.campanhaUrl}?`, { params })
      .toPromise()
      .then(response => {
        const resultado = {
          campanhas: response.content,
          total: response.totalElements
        };

        return resultado;
      })
  }

  pesquisarCampanhaPorId(id: number): Promise<any> {
    return this.http.get<any>(`${this.campanhaUrl}/${id}`)
      .toPromise()
      .then(response => {
        const resultado = response;
        return resultado;
      })
  }

  adicionarCampanha(campanha: Campanha): Promise<Campanha> {
    return this.http.post<Campanha>(this.campanhaUrl, campanha)
      .toPromise()
      .then(response => {
        const resultado = response;
        return resultado;
      })
  }

  atualizarCampanha(campanha: Campanha): Promise<Campanha> {
    return this.http.put<Campanha>(`${this.campanhaUrl}/${campanha.id}`, campanha)
      .toPromise()
      .then(response => {
        const campanhaAlterada = response;
        return campanhaAlterada;
      });
  }

  mudarStatus(id: number): Promise<void> {
    return this.http.put(`${this.campanhaUrl}/${id}/mudarStatus`, null)
      .toPromise()
      .then(() => null);
  }

}
