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
    }

    loadSysMenu():Observable<any>{
        let url = "assets/app-menu.json";
        //url = "assets/app-data.json";
        let body = null;
        let params = {};      
        let options = {};
        return this.httpService.get(url, params).map((result:any) => { 
           return result;
        }).catch(
            error => this.httpService.handleError(url,error)
        );            
    }
    
}    