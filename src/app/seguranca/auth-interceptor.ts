import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() { }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.headers.get('Authorization').length != 0){
            console.log(req.headers.get('Authorization'));    
            return next.handle(req);
        } else {
            const authHeader = localStorage.getItem('token');
            const authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + authHeader) });
            return next.handle(authReq);
        }
    }

}