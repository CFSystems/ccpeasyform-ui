import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

import { FactoryHttp } from '../seguranca/factory-http';
import { environment } from '../../environments/environment';

@Injectable()
export class DashboardService {

  dashboardUrl: string;

  constructor(
    private http: FactoryHttp
  ) {
    this.dashboardUrl = `${environment.apiUrl}`;
  }

  atendimentosPorCampanha(): Promise<Array<any>> {
    return this.http.get<Array<any>>(`${this.dashboardUrl}/atendimento/estatisticas/por-campanha`)
      .toPromise()
      .then(response => response);
  }

  atendimentosPorUsuario(): Promise<Array<any>> {
    return this.http.get<Array<any>>(`${this.dashboardUrl}/atendimento/estatisticas/por-usuario`)
      .toPromise()
      .then(response => response);
  }

  atendimentosPorDia(): Promise<Array<any>> {
    return this.http.get<any>(`${this.dashboardUrl}/atendimento/estatisticas/por-dia`)
      .toPromise()
      .then(response => {
        const dados = response;
        this.converterStringsParaDatas(dados);

        return dados;
      });
  }

  atendimentosCompleto(): Promise<Array<any>> {
    return this.http.get<Array<any>>(`${this.dashboardUrl}/atendimento/estatisticas/completo`)
      .toPromise()
      .then(response => {
        const dados = response;
        return dados;
      });
  }

  respostasPorFormulario(idCampanha: number, idFormulario: number, idPergunta: number): Promise<Array<any>> {
    return this.http.get<any>(`${this.dashboardUrl}/resposta/estatisticas/por-formulario/${idCampanha}/${idFormulario}/${idPergunta}`)
      .toPromise()
      .then(response => {
        const dados = response;
        return dados;
      });
  }

  private converterStringsParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }
}
