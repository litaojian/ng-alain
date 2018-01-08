import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class MySelect2Service {
	constructor(private http: HttpClient) {

	}

	getData(url: string):any{
		return this.http.post(url,{});
	}
}