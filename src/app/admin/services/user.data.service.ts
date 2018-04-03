import { Injectable, Inject, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { BaseDataService } from 'ngx-widget/my-app';

@Injectable()
export class UserDataService extends BaseDataService {
        
    constructor(
        _injector: Injector
    ) { 
        super(_injector);
        console.log("UserDataService init .............");
    }

    loadSysMenu():Observable<any>{
        let url = "/api/data/json/app-menu";
        //url = "assets/app-data.json";
        let body = null;
        let params = {};      
        let options = {};
        return this.ajaxGet(url, params).map((result:any) => { 
           return result;
        }).catch(
            (error):any => {debugger; this.httpService.handleError(url,error)}
        );            
    }
    
}    