import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Atendimento, Resposta } from '../core/model';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {

  atendimentoUrl: string;
  respostasUrl: string;

  constructor(private http: Http) {
    this.atendimentoUrl = `${environment.apiUrl}/ccpeasyform-api/atendimento`;
    this.respostasUrl = `${environment.apiUrl}/ccpeasyform-api/resposta`;
  }

  adicionarAtendimento(atendimento: Atendimento): Promise<Atendimento> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AY2ZzeXN0ZW1zLmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.atendimentoUrl,
      JSON.stringify(atendimento), { headers })
      .toPromise()
      .then(response => {
        const resultado = response.json();
        return resultado;
      })
  }

  adicionarRespostas(resposta: Resposta): Promise<Resposta> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AY2ZzeXN0ZW1zLmNvbTphZG1pbg==');
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.respostasUrl,
      JSON.stringify(resposta), { headers })
      .toPromise()
      .then(response => {
        const resultado = response.json();
        return resultado;
      })
  }
}
