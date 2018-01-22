import { Injectable, Injector } from '@angular/core';
import { BaseDataService } from "../../../bizapp/base/base-data.service";
import { HttpClient } from "@angular/common/http";
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ControlListService extends BaseDataService  {
    selectList:object = {};
    constructor(protected injector:Injector){
        super(injector);
        this.setApiUrl("/api/rest/carControl");
        this.setIsTest(false);
        this.setIdField("bkxh");
        this.setValuelistTypes(['bkdl','bkxz','bkjb','bjya','carType','citys']);

    }

    getSelectList(){
        return this.loadValueListData();
    }

    loadValueListData():Object {
		let typenames:string[] = this.getValuelistTypes();
		let valuelist = {};
		//console.log("loadValueListData "+ this.service.getValuelistTypes().toString() +" ..........");
		if (typenames != null){
			typenames.forEach(_typename =>{
			  this.getValueList(_typename).subscribe(data =>{
              let label , value;
			  for(let item in data){
				if (valuelist[_typename] == null){
				  	valuelist[_typename] = [];
				}
				//console.log("item:" + JSON.stringify(data[item]));
				if (data[item]["dmz"] && data[item]["dmsm1"]){
				  //typename = data[item]["typename"].toLowerCase();
				  value = data[item]["dmz"];
				  label = data[item]["dmsm1"];
				  valuelist[_typename].push({"label":label, "value":value});
				}else{
				  valuelist[_typename].push(data[item]);
				}
			  }
			});
		  });
		}
		return valuelist;
    }

    getValueList(typeName: string): Observable<Object[]> {

		//return Observable.of([{"label":"123", "value":"123"}, {"label":"456", "value":"456"}]);

		// debugger;
		let data = BaseDataService.CachedDataMap.get(typeName);
		if (data && data instanceof Array && data.length > 0 ){
			// get data from data cache
			//console.log(typeName + " data found in cached, " + data.length);
			return Observable.of(data);
		}

		let url = `/api/data/valuelist/${typeName}`;
		if (typeName.startsWith("/assets")){
			url = typeName;
		}
		let headers = new Headers({ 'Content-Type': 'application/json','Authorization': this.getAccessToken()});
		let options = new RequestOptions({ "headers": headers });
		let customUrl:string;
		let tableColumns:string;

		if (typeName.startsWith("/api")){
			let splitPos = typeName.indexOf("?");
			customUrl = typeName.substring(0, splitPos);
			if (splitPos  > 0){
				tableColumns = typeName.substring(splitPos);
				tableColumns = tableColumns.replace("?cols=","");
				//console.log("getValueList: tableColumns=" + tableColumns);
			}else {
				customUrl = typeName;
			}
			url = customUrl;
		}

		// invoke http request
		return this.ajaxGet2(url, options)
			.map(respObject => {
				// debugger;
				let result = JSON.parse(respObject["_body"]);
				if (tableColumns != null && result != null){
					let columns = tableColumns.split(",");
					let data = result["data"];
					for(let i = 0;i < data.length;i++){
						data[i]["keyname"] = data[i][columns[0]];
						data[i]["valuetext"] = data[i][columns[1]];
						data[i]["value"] = data[i][columns[0]];
						data[i]["label"] = data[i][columns[1]];
					}
				}

				let rows:Object[];

				if (result["data"] != null){
					rows = result["data"]["options"];
					if (rows == null){
						rows = result["data"];
					}
				}else{
					rows = result;
				}
				let options: Object[] = [];
				if (rows != null) {
					for (var item in rows) { // for acts as a foreach
						//console.log(rows[item]["keyname"]);
						if (rows[item]["dmsm1"]){
							options.push({ value: rows[item]["dmz"], label: rows[item]["dmsm1"] });
						}else if (item["dmsm1"]){
							options.push({ value: item["dmz"], label: item["dmsm1"] });
						}else if (Number.parseInt(item) >= 0 ){
							options.push({ value: rows[item]["optvalue"], label: rows[item]["optlabel"] });
						}
					}

				}
				// cache the valuelist
				BaseDataService.CachedDataMap.set(typeName, options);
				return options;
			})
			.catch(this.handleError);

	}

    getUserInfo(){
        return this.ajaxGet('/remote/api/data/user/userInfo',{});
    }

    getBkdlTree(){
        return this.ajaxGet('/remote/api/data/bkdlTree',{});
    }

}
