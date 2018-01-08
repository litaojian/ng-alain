import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Headers, Http, URLSearchParams,RequestOptions } from '@angular/http';
import { MyDataService } from '../../../../app/admin/services/my.data.service';
@Injectable()
export class MyTabelService{
	constructor(private MyDataService: MyDataService) { }

	getData(url,params: any):any{
	  return this.MyDataService.doGet(url,params); 
	}
}
