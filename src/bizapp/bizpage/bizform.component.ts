import { Observable } from 'rxjs/Observable';
import { CommonModule } from '@angular/common';
import { Component, ViewChild, ViewContainerRef, OnInit, HostBinding, AfterViewInit } from '@angular/core';
import { ComponentFactoryResolver, ComponentFactory, ComponentRef, Compiler, Injector, NgModule, NgModuleRef } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, Params } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, FormBuilder, Validators, AbstractControl, NgModel } from '@angular/forms';
import { Location } from '@angular/common';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { AppBaseModule } from '../base/app-base.module';
import { BaseDetailComponent } from '../base/base-detail.component';
import { MyInputComponent } from '../base/controls/myinput.component';
import { DataObject} from '../base/base-data.service';
import { BizFormService } from './bizform.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
	//moduleId: module.id,
	template: `<ng-template #formContainer></ng-template>`,
	styles: [`
	`],
	animations: []
})
export class BizFormComponent extends BaseDetailComponent implements OnInit, AfterViewInit {

	@ViewChild("formContainer", { read: ViewContainerRef })
	formContainer: ViewContainerRef;
	bizFormService: BizFormService;
	messageService: NzMessageService

	formData:DataObject =  new DataObject();	
	
	constructor(
		service: BizFormService,
		activatedRoute: ActivatedRoute,
		router: Router,		
		location: Location,		
		protected resolver: ComponentFactoryResolver,
		private _compiler: Compiler,
		private _injector: Injector,
		private _ngModuleRef: NgModuleRef<any>,
		private viewContainerRef: ViewContainerRef
	) {
		super(_injector, service);
		this.messageService = _injector.get(NzMessageService);
		this.bizFormService = service;
		//this.formPageDef["fields"] = [];
		this.formData["testname"] = "ltj";
	}

	ngOnInit() {
		//super.ngOnInit();
		// if (!this.url) return;
		let len = this.activatedRoute.snapshot.url.length;
		let dir = this.activatedRoute.snapshot.url[0].path;		
		let cmd, pageName;
		if (len >= 2){
			pageName = this.activatedRoute.snapshot.url[1].path;			
		}			
		if (len >= 3){
			cmd = this.activatedRoute.snapshot.url[2].path;			
		}
		let rowId = -1;
		if (len >= 4){
			rowId = +this.activatedRoute.snapshot.url[3].path;			
		}
		
		//this.rowId = this.activatedRoute.snapshot.url[len - 1].path;
		if (pageName == null){
			pageName = dir;
			dir = "common";
		}
		this.bizFormService.getPageDef(`main/${dir}/${pageName}.json`).then(data => {
			//this.formPageDef = data;
			let jsonData = data.json();
			this.service.setApiUrl(jsonData.dataApiUrl);
			this.service.setIdField(jsonData.idField);
			this.service.setListViewUrl(`${jsonData.basePagePath}/list`);
			this.service.setFormViewUrl(this.router.url);
			let templateUrl = `main/${dir}/${jsonData.formTemplateUrl}`;
			let pageType = "formView";
			let htmlContent = this.bizFormService.getHtmlTemplate(templateUrl);
		
			this.compileModuleAndComponent(pageName, pageType, htmlContent);
		});
	}

	/**
	 * 编译新页面
	 * @param htmlContent 
	 */
	compileModuleAndComponent(pageName:string, pageType:string, htmlContent:Promise<Object>) {
		
		htmlContent.then(data =>{
			let html = data["_body"];
			const tmpCmp = Component({ template: html, providers:[] })(class form_1 implements OnInit{
				ngOnInit(){
				}
			});

			const tmpModule = NgModule({ 
				imports: [CommonModule, FormsModule, RouterModule, AppBaseModule], 
				declarations: [tmpCmp],
				providers:[BizFormService] 
			})(class {
				
			});

			this._compiler.compileModuleAndAllComponentsAsync(tmpModule).then((factories) => {
					//debugger;
					let componentFactory = this.findComponentFactorByName(factories.componentFactories, "form_1");
					if (componentFactory != null){
						//let ComponentFactory = factories.componentFactories[1];
						console.log(componentFactory.componentType.name);
						const cmpRef = componentFactory.create(this._injector, [], null, this._ngModuleRef);
						if ("formView" == pageType){
							cmpRef.instance.ngOnInit = super.ngOnInit;							
							cmpRef.instance.service = this.service;
							// cmpRef.instance.formData = this.formData;	
							// cmpRef.instance.isNew = this.isNew;
							// cmpRef.instance.isReadOnly = this.isReadOnly;
							// cmpRef.instance.router = this.router;
							// cmpRef.instance.activatedRoute = this.activatedRoute;
							//cmpRef.instance.goPage = this.goPage;	
							//cmpRef.instance.goBack = this.goBack;		
							//cmpRef.instance.getKeys = this.getKeys;	

							//cmpRef.instance.onSubmitBtnClick = super.onSubmitBtnClick;
							//cmpRef.instance.onCommandBtnClick = super.onCommandBtnClick;
							
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
						}						
						//cmpRef.instance.process = this.process;
						this.formContainer.insert(cmpRef.hostView);
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
		//debugger;
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

	}

	alert(msg){
		if (msg == null){
			msg = "错误,提示信息不能空";
		}
		this.messageService.info(msg);
	}

}

