import { Injectable,Injector } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseDataService } from '../base/base-data.service';

@Injectable()
export class BizFormService extends BaseDataService {

	constructor(injector: Injector) {
		super(injector);

		//this.setIsTest(false);
		//this.setApiUrl(apiUrl);
		//this.setIdField(idField);
	}


	getPageDef(url: string) {
		return this.http.get(url).toPromise();
	}


	getHtmlTemplate(templateUrl: string): Promise<Object> {
		return this.ajaxLoad(templateUrl);
	}

}
