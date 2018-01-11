import { Observable } from 'rxjs/Observable';
import { CommonModule } from '@angular/common';
import { Component, ViewChild, ViewContainerRef, OnInit, OnDestroy, HostBinding, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked, OnChanges, DoCheck } from '@angular/core';
import { ComponentFactoryResolver, ComponentFactory, ComponentRef, Compiler, Injector, NgModule, NgModuleRef } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, FormBuilder, Validators, AbstractControl, NgModel } from '@angular/forms';
import { Location } from '@angular/common';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { AppBaseModule } from '../base/app-base.module';
import { BaseListComponent, QueryForm } from '../base/base-list.component';
import { BaseDataService } from '../base/base-data.service';
import { BizQueryService } from './bizquery.service';

@Component({
	//moduleId: module.id,
	template: `<ng-template #container></ng-template>`,
	styles: [`
	`],
	animations: []
})
export class BizDialogForQueryComponent extends BaseListComponent implements OnInit, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked {

	@ViewChild("container", { read: ViewContainerRef })
	container: ViewContainerRef;
	bizQueryService:BizQueryService;
	pagePath:string;
	methodContainer:any;
	isOK:string;
	location: Location;		
	_resolver: ComponentFactoryResolver;
	_compiler: Compiler;
	_ngModuleRef: NgModuleRef<any>;
	_viewContainerRef: ViewContainerRef;

	constructor(
		protected injector: Injector, 
		service: BizQueryService
	) {
		super(injector, service);
		this._compiler = injector.get(Compiler);
		this._resolver = injector.get(ComponentFactoryResolver);
		this._ngModuleRef = injector.get(NgModuleRef);
		this._viewContainerRef = injector.get(ViewContainerRef);
		
		this.bizQueryService = service;
		this.pagePath = "#" + this.router.url;
	}

	ngOnInit() {
		//console.log("ngOnInit .....");
		this.loadPageContent();		
	}

	ngAfterViewChecked() {
		let _pagePath = "#" + this.router.url;
		if (this.pagePath != _pagePath){
			console.log("URL变化了,需要重新加载页面内容");	
			this.loadPageContent();
		}
		//console.log("bizQuery afterViewChecked " + this.pagePath);
	}	

	loadPageContent() {
		//debugger;
		this.container.clear();
		this.pagePath = "#" + this.router.url;
		let dir, pageName, cmd;
		let len = this.activatedRoute.snapshot.url.length;
		if (len > 0){
			dir = this.activatedRoute.snapshot.url[0].path;		
			pageName = this.activatedRoute.snapshot.url[1].path;
			cmd = this.activatedRoute.snapshot.url[2].path;		
			if (len >= 4){
				//this.parentId = +this.activatedRoute.snapshot.url[3].path;			
			}
		}else {
			let dialogUrl:string = this["dialogUrl"];			
			let paths = dialogUrl.split("/");
			if (paths != null && paths.length > 0){
				dir = paths[1];
				pageName = paths[2];
				cmd = paths[3];				
			}
			this.activatedRoute.snapshot.data = this['dialogParams'];			
		}
		//
		console.log("load bizdialog def..............");

		this.bizQueryService.getPageDef(`main/${dir}/${pageName}.json`).then(data => {
			let jsonData = data.json();
			this.bizQueryService.setApiUrl(jsonData.dataApiUrl);
			this.bizQueryService.setIdField(jsonData.idField);
			this.bizQueryService.setFormViewUrl(jsonData.basePagePath+"/view");
			this.bizQueryService.setListViewUrl(this.router.url);
			this.bizQueryService.setValuelistTypes(jsonData['valuelistTypes']);
			let templateUrl = `main/${dir}/${jsonData.listTemplateUrl}`;
			
			if (jsonData.methodContainer != null){
				this.methodContainer.src =  `main/${dir}/${jsonData.methodContainer}`;
			}
			
			if (jsonData.userFunctionJS != null){
				this.userFunctionJS =  `main/${dir}/${jsonData.userFunctionJS}`;
			}
			
			let htmlContent = this.bizQueryService.getHtmlTemplate(templateUrl);
			let pageType = "listView";
			this.compileModuleAndComponent(pageName,pageType, htmlContent);
		});

	}

	compileModuleAndComponent(pageName:string, pageType:string, htmlContent:Promise<Object>) {

		htmlContent.then(data =>{
			let html = data["_body"];
			//debugger;
			const tmpCmp = Component({ template: html, providers:[BizQueryService] })(class query_1 implements OnInit, AfterViewInit, OnDestroy {
				// constructor(service: BaseDataService, activatedRoute: ActivatedRoute, router: Router) {
				// 	super(service, activatedRoute, router);
				// }
				ngOnInit(){
				}
				ngAfterViewInit(){					
				}
				ngOnDestroy(){	
					console.log(" tmpCmp ngOnDestory......");				
				}

			});
			const tmpModule = NgModule({ 
				imports: [CommonModule, FormsModule, AppBaseModule,RouterModule], 
				declarations: [tmpCmp],
				providers:[BizQueryService] 
			})(class {
				
			});

			this._compiler.compileModuleAndAllComponentsAsync(tmpModule).then((factories) => {
					//debugger;
					let componentFactory = this.findComponentFactorByName(factories.componentFactories, "query_1");
					if (componentFactory != null){
						//let ComponentFactory = factories.componentFactories[1];
						//console.log(f.componentType.name);
						const cmpRef = componentFactory.create(this.injector, [], null, this._ngModuleRef);
						cmpRef.instance.activatedRoute = this.activatedRoute;	
						cmpRef.instance.router = this.router;			
						// super class
						cmpRef.instance.ngOnInit = super.ngOnInit;		
						cmpRef.instance.ngAfterViewInit = super.ngAfterViewInit;	
						cmpRef.instance.ngOnDestroy = super.ngOnDestroy;

						cmpRef.instance.service = this.bizQueryService;	
						cmpRef.instance.idField = this.service.getIdField();
						
						// cmpRef.instance.pageSize = this.pageSize;
						// cmpRef.instance.pagePath = this.pagePath;				
						// cmpRef.instance.selectedRow = this.selectedRow;
						// cmpRef.instance.processResult = this.processResult;	
						// cmpRef.instance.totalCount = this.totalCount;
						// cmpRef.instance.tableData = this.tableData;
						// cmpRef.instance.queryForm = this.queryForm;
						// cmpRef.instance.initDefaultQueryParamters = this.initDefaultQueryParamters;						
						// cmpRef.instance.parseInputField = this.parseInputField;
						// cmpRef.instance.getPageSize = this.getPageSize;
						// cmpRef.instance.getPageIndex = this.getPageIndex;
						// cmpRef.instance.setPageSize = this.setPageSize;
						// cmpRef.instance.setPageIndex = this.setPageIndex;						
						// cmpRef.instance.getList = this.getList;
						// cmpRef.instance.onPageLinkClick = this.onPageLinkClick;						
						// cmpRef.instance.onDeleteRow = this.onDeleteRow;
						// cmpRef.instance.goPageUrl = this.goPageUrl;						
						// cmpRef.instance.onAddNew = this.onAddNew;
						// cmpRef.instance.onEditRow = this.onEditRow;
						// cmpRef.instance.onViewRow = this.onViewRow;
						// cmpRef.instance.onQuery = this.onQuery;
						// cmpRef.instance.getKeys = this.getKeys;
						// cmpRef.instance.getValue = this.getValue;
						// cmpRef.instance.onButtonClick = this.onButtonClick;
						// cmpRef.instance.methodContainer = this.methodContainer;
						// cmpRef.instance.onTreeNodeClick = this.onTreeNodeClick;
						// cmpRef.instance.saveCurrentState = this.saveCurrentState;
						// cmpRef.instance.restoreCurrentState = this.restoreCurrentState;
						// cmpRef.instance.onActionCmdClick  = this.onActionCmdClick;
						// cmpRef.instance.openLink  = this.openLink;
						// cmpRef.instance.onOpenModalDialog  = this.onOpenModalDialog;
						// cmpRef.instance.userFunctionJS  = this.userFunctionJS;
						// cmpRef.instance.loadScript  = this.loadScript;
						// cmpRef.instance.onQueryFormSubmit  = this.onQueryFormSubmit;
						// cmpRef.instance.onFormFieldInput  = this.onFormFieldInput;
						
						for(var key in this){
							if (key.startsWith("_") || key.startsWith("ng") || key == "service" || key == "idField"){
								continue;
							}
							cmpRef.instance[key] = this[key];																	
							if(typeof this[key]=='function'){
								//console.log("bizForm function = "+ key);
							} else if(typeof this[key]=='object'){
								//console.log("bizForm object = "+ key);
							}else {
								//console.log("bizQuery property = "+ key);
							}	
						}	

						this.container.insert(cmpRef.hostView);
					}
				}).catch( error => this.handleCompilerError(error));

			});
	}
	/**
	 * 按类名查找ComponentFactory
	 * @param componentFactories 
	 * @param name 
	 */
	findComponentFactorByName(componentFactories: ComponentFactory<any>[], name:string){
		for(let i = 0; i < componentFactories.length; i++){
			if (name == componentFactories[i].componentType.name){
				return componentFactories[i];
			}
		}
		return null;
	}

	handleCompilerError(error){
		console.error("deubg :" + error);
	}

	ngAfterViewInit() {
		console.log("bizdialog Query afterViewInit");
		//console.log("input url:" + this['dialogUrl']);
	}

	ngAfterContentInit(){
		//console.log("bizQuery ngAfterContentInit ");	
	}

	ngAfterContentChecked(){
		//console.log("bizQuery ngAfterContentChecked ");	
	}

}
