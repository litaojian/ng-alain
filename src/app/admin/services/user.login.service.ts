import { Injectable, Inject, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { tap, map, mergeMap, catchError } from 'rxjs/operators';
import { BaseDataService } from 'ngx-widget/my-app';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';

@Injectable()
export class UserLoginService extends BaseDataService {
        
    constructor(
        @Inject(DA_SERVICE_TOKEN) private _tokenService: ITokenService,
        _injector: Injector
    ) { 
        super(_injector);
        //
        console.log("UserLoginService init .......");

    }

    
    doLoginAction(body): Observable<Object>{
        
        let url = "/api/login/userPassword"
        let params = {};        
        let options = {};
        
        return this.ajaxPost(url, params)
            .map((result:any) => {             
                if (result["userToken"] != null && result["resultCode"] == 0){
                    // 登录成功后,跳转回原URL
                    this._tokenService.set({
                        token: result["userToken"],
                        name: result["userName"],
                        email: result["email"],
                        id: result["userId"],
                        time: +new Date
                    });                   
                }
                return result;
            }).catch(
                error => this.httpService.handleError(url,error)
            );           
        
        
    }

}    