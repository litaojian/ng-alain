import { Injectable,Injector } from '@angular/core';
import { Headers, Http, URLSearchParams,RequestOptions } from '@angular/http';
import { BaseDataService }  from '../base-data.service';

import 'rxjs/add/operator/toPromise';
import { environment } from 'environments/environment.prod';

/**
 * 用户权限服务
 */
@Injectable()
export class UserPermissionService extends BaseDataService {
    constructor(injector: Injector) {
        super(injector);
    }
    
    checkMenuPermission(menuUrl:string, loginUserId:string) : Promise<Object> {
        let dataUrl = "/api/data/admin/checkMenuRight";
        let debug = environment["debug"];
        let params = {"menuUrl":menuUrl, "loginUserId":loginUserId, "debug":debug};
        return this.ajaxGet(dataUrl, params);
    }
}

