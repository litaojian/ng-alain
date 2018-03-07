import { Observable } from 'rxjs/Observable';
import { Component, ViewChild, OnInit, HostBinding, AfterViewInit, Injector, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { ReuseTabService } from '@delon/abc';
import { TestRecService } from '../testRec2/testRec.service';

@Component({
	templateUrl: './test2.html',
	inputs: [],
	outputs: []
})
export class Test2Component implements OnInit, OnDestroy {

	options_docstatus:Object[] = [];

	options = [];
  	selectedOption;

	person$: Observable<Object>;
	reuseTabService:ReuseTabService;

	constructor(
		injector: Injector,
		route: ActivatedRoute,
		router: Router
	) {
		this.reuseTabService = injector.get(ReuseTabService);
		let testRecService = injector.get(TestRecService);
	}

	ngOnInit() {
		this.options_docstatus.push({"value":"1", "label":"text1"});
		this.options_docstatus.push({"value":"2", "label":"text2"});
		this.options_docstatus.push({"value":"APPR", "label":"已审核2"});
		
		 /*模拟服务器异步加载*/
		 setTimeout(_ => {
			this.options = [
			  { value: 'jack', label: 'Jack' },
			  { value: 'lucy', label: 'Lucy' },
			  { value: 'disabled', label: 'Disabled', disabled: true }
			];
			this.selectedOption = this.options[ 0 ];
		  }, 100);
		  
		this.reuseTabService.title = "Test1";
	}

	onQuery(): void {
	}

	ngOnDestroy(){	
		console.log(" testRec ngOnDestory......");				
	}

}

