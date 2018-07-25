import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { FactoryHttp } from '../seguranca/factory-http';
import { Usuario } from '../core/model';

export class UsuarioFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class UsuarioService {

  usuarioUrl: string;

  usuario = new Usuario();

  constructor(private http: FactoryHttp) {
    this.usuarioUrl = `${environment.apiUrl}/usuario`;
  }

  pesquisarUsuario(filtro: UsuarioFiltro): Promise<any> {
    let params = new HttpParams({
      fromObject: {
        page: filtro.pagina.toString(),
        size: filtro.itensPorPagina.toString()
      }
    })

    if (filtro.nome) {
      params = params.append('nome', filtro.nome);
    }

    return this.http.get<any>(`${this.usuarioUrl}?`, { params })
      .toPromise()
      .then(response => {
        const usuarios = response.content;

        const resultado = {
          usuarios, 
          total: response.totalElements
        };

        return resultado;
      })
  }

  pesquisarUsuarioPorId(id: number): Promise<any> {
    return this.http.get<any>(`${this.usuarioUrl}/${id}`)
      .toPromise()
      .then(response => {
        const resultado = response;
        return resultado;
      })
  }

  adicionarUsuario(usuario: Usuario): Promise<Usuario> {
    return this.http.post<Usuario>(this.usuarioUrl, usuario)
      .toPromise()
      .then(response => {
        const resultado = response;
        return resultado;
      })
  }

  atualizarUsuario(usuario: Usuario): Promise<Usuario> {
    return this.http.put<Usuario>(`${this.usuarioUrl}/${usuario.id}`, usuario)
      .toPromise()
      .then(response => {
        const perguntaAlterada = response;
        return perguntaAlterada;
      });
  }

  editarUsuario(usuario: Usuario) {
    this.usuario = usuario;
  }

  mudarStatus(id: number, ativo: boolean): Promise<void> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');
    return this.http.put(`${this.usuarioUrl}/${id}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null);
  }
  
}
