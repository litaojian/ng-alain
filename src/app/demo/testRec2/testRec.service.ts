import { Injectable,Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BaseDataService }  from 'ngx-widget/my-app';

@Injectable()
export class TestRecService extends BaseDataService {

    constructor(injector: Injector) {
        super(injector);
				
		this.setApiUrl("/api/rest/testRec");
		this.setIdField("testRecId");
		this.setValuelistTypes(["docStatus","dataType"]);
	}



}
