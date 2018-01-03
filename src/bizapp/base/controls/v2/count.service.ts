
// import { Injectable } from '@angular/core';
// import { Headers, Http, URLSearchParams,RequestOptions } from '@angular/http';
// import 'rxjs/add/operator/toPromise';

// @Injectable()
// export class pageService {
// 	constructor(private http: Http) { }

// 	getData(params: any,url): Promise<any> {
// 	  return this.http.get(url, {
// 	  				search: this.bulidSearchString(params)
// 	  		   })
//                .toPromise()
//                .then(res => res.json())
//                .catch(this.handleError); 
// 	}
//   private bulidSearchString(params: any) {
// 		let searchString: URLSearchParams = new URLSearchParams();
// 		for (let k in params) {
// 			if (params[k] !== '') searchString.set(k, params[k]);
// 		}
// 		return searchString;
// 	}

// 	private handleError(error: any): Promise<any> {
// 		console.error('An error occurred', error);
// 		return Promise.reject(error.message || error);
// 	}
// }
