import { Observable } from 'rxjs/Observable';
import { Component, ViewChild, OnInit, HostBinding, AfterViewInit, Injector, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Location } from '@angular/common';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { BaseListComponent, QueryForm } from 'bizapp/base/base-list.component';
import { BaseDetailComponent } from 'bizapp/base/base-detail.component';
import { BaseDataService } from 'bizapp/base/base-data.service';

import { TestRecService } from '../test-rec/testRec.service';

import 'rxjs/add/operator/switchMap';

export class MyQueryForm extends QueryForm {
	testname: string;
	teststatus:string;
	testdesc: string;
	testtype: string;	
	createdBy:string;

}


@Component({
	templateUrl: './test1.html',
	inputs: [],
	outputs: []
})
export class Test1Component extends BaseListComponent implements OnInit, OnDestroy {

	queryForm: MyQueryForm = new MyQueryForm();

	options_docstatus:Object[] = [];

	options = [];
  	selectedOption;


	constructor(
		injector: Injector,
		service: TestRecService,
		route: ActivatedRoute,
		router: Router
	) {
		super(injector, service );
	}

	ngOnInit() {
		this.options_docstatus.push({"value":"1", "label":"text1"});
		this.options_docstatus.push({"value":"2", "label":"text2"});
		this.options_docstatus.push({"value":"APPR", "label":"已审核2"});

		this.setPageSize(10);
		// load the tableData
		this.getList("refresh", this.getPageIndex(), this.getPageSize());

		 /*模拟服务器异步加载*/
		 setTimeout(_ => {
			this.options = [
			  { value: 'jack', label: 'Jack' },
			  { value: 'lucy', label: 'Lucy' },
			  { value: 'disabled', label: 'Disabled', disabled: true }
			];
			this.selectedOption = this.options[ 0 ];
		  }, 100);
		  
	}

	onQuery(): void {
		super.onQuery(this.queryForm);
	}

	ngOnDestroy(){	
		console.log(" testRec ngOnDestory......");				
	}

}

