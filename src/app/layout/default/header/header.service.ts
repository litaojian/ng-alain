import { Injectable } from '@angular/core';
// import { Headers, Http, URLSearchParams,RequestOptions } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
// import { environment } from '../../environments/environment';
@Injectable()
export class HeaderService {
	constructor(private http: HttpClient) {}
	showImages(body:any):any{
	   return this.http
            .post('images/api/recog/',body);	  
	}
}
