import { Injectable,Injector } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseDataService }  from 'bizapp/base/controls/mytest/form-test.service';
import { dialogService } from './dialog.service';
@Injectable()
export class formService extends dialogService{

    constructor(injector:Injector) {
        super(injector);
	}
	
}
