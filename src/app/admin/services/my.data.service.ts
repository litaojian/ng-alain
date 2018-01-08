import { Injectable, Inject, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import { _HttpClient } from "@delon/theme/services/http/http.client";
import { MenuService, SettingsService, TitleService } from '@delon/theme';
import { ITokenService, DA_SERVICE_TOKEN } from '@delon/auth';
import { Observable } from 'rxjs/Observable';
import { tap, map, mergeMap, catchError } from 'rxjs/operators';
@Injectable()
export class MyDataService {
        
    _httpClient:_HttpClient;

    constructor(
        _injector: Injector,
        @Inject(DA_SERVICE_TOKEN) private _tokenService: ITokenService
    ) { 
        this._httpClient = _injector.get(_HttpClient);        
    }
    doPost(url: string, body?: any, params?: any,option?: any):Observable<any> {
        // debugger;
        return this._httpClient.post(url, body,params,option);
    }

    doGet(url: string, body?: any, params?: any):Observable<any> {
        return this._httpClient.get(url, body, params);
    }

    doLoginAction(body): Observable<any>{

        let url = "remote/api/login/userPassword"
        let params = {};        
        let options = {};
        
        return this._httpClient.post(url, body, params, options).pipe(
            map((result: any) => {
                                          
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
            })
        );
        
    }

    loadSysMenu():Observable<any>{
        let url = "remote/api/data/json/app-menu";
        //url = "assets/app-data.json";
        let body = null;
        let params = {};      
        let options = {};
        return this._httpClient.get(url, params).pipe(   
            map((data: any) => {
                return data;
            }), 
            catchError((err:any) => {
                // 以错误的形式结束本次请求
                console.log("loadSysMenu error:" + err);
                return err;
            })
        );
    }
    
}    