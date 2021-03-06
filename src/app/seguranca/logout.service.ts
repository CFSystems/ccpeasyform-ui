import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { environment } from '../../environments/environment';
import { FactoryHttp } from './factory-http';
import { AuthService } from './auth.service';

@Injectable()
export class LogoutService {

  tokensRenokeUrl: string;

  constructor(
    private http: FactoryHttp,
    private auth: AuthService
  ) {
    this.tokensRenokeUrl = `${environment.apiUrl}/tokens/revoke`;
  }

  logout() {
    return this.http.delete(this.tokensRenokeUrl, { withCredentials: true })
      .toPromise()
      .then(() => {
        this.auth.limparAccessToken();
      });
  }
}
