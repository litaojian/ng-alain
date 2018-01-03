import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class MyTabelService{
	constructor(private http: HttpClient) { }

	getData(params: any,url):any{
	   return this.http.get(url,{params}); 
	}
}
