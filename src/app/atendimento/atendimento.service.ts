import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Atendimento, Resposta } from '../core/model';
import { FactoryHttp } from '../seguranca/factory-http';
import { AuthService } from '../seguranca/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AtendimentoService {

  atendimentoUrl: string;
  respostasUrl: string;

  constructor(
    private http: FactoryHttp
  ) {
    this.atendimentoUrl = `${environment.apiUrl}/atendimento`;
    this.respostasUrl = `${environment.apiUrl}/resposta`;
  }

  adicionarAtendimento(atendimento: Atendimento): Promise<Atendimento> {
    return this.http.post<Atendimento>(this.atendimentoUrl, atendimento)
      .toPromise()
      .then(response => {
        const resultado = response;
        return resultado;
      })
  }

  adicionarRespostas(resposta: Resposta): Promise<Resposta> {
    return this.http.post<Resposta>(this.respostasUrl, resposta)
      .toPromise()
      .then(response => {
        const resultado = response;
        return resultado;
      })
  }
}