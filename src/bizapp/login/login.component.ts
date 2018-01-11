
import { Observable } from 'rxjs/Observable';
import { CommonModule } from '@angular/common';
import { Component, ViewChild, ViewContainerRef, OnInit, OnDestroy, HostBinding, AfterViewInit } from '@angular/core';
import { ComponentFactoryResolver, ComponentFactory, ComponentRef, Compiler, Injector, NgModule, NgModuleRef } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, Params, NavigationExtras} from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, FormBuilder, Validators, AbstractControl, NgModel } from '@angular/forms';
import { Location } from '@angular/common';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { AppBaseModule } from '../base/app-base.module';
import { BaseDetailComponent } from '../base/base-detail.component';
import { MyInputComponent } from '../base/controls/myinput.component';
import { DataObject} from '../base/base-data.service';
import { BizFormComponent } from '../bizpage/bizform.component';
import { BizFormService } from '../bizpage/bizform.service';
import { AuthService, LoginInfo } from '../base/acl/auth.service';
import { environment } from '../../environments/environment';

@Component({
	//moduleId: module.id,
	template: `<ng-template #formContainer></ng-template>`,
	animations: [],
  providers:[AuthService, BizFormService]
  
})

export class LoginComponent extends BizFormComponent implements OnInit {
  
  authService:AuthService;
  message: string;
  logoImage: string = "assets/img/angular.svg";
  loginInfo: LoginInfo = new LoginInfo();
  loginForm: FormGroup;

  constructor(
		service: BizFormService,
		activatedRoute: ActivatedRoute,
		router: Router,		
		location: Location,		
		resolver: ComponentFactoryResolver,
		_injector:Injector,    
    _compiler: Compiler,
		_ngModuleRef: NgModuleRef<any>,
		_viewContainerRef: ViewContainerRef,
	) {
		super(service, activatedRoute, router, location, resolver, _compiler, _injector, _ngModuleRef, _viewContainerRef);
    this.bizFormService = service;
    this.authService = _injector.get(AuthService);
    
    this.message = "";
    this.loginInfo.loginId = "user1";
    this.loginInfo.password = "123456";
    if (environment["logoImage"]){
      this.logoImage = environment["logoImage"];
    }


    this.loginForm = this.formBuilder.group({
      loginId: ['user1'],      
      email: [null],
      password: ["123456", Validators.required],
      remember: [null],
      mobile: [null],
      captcha: [null],
    });

  }

  get loginId() { return this.loginForm.controls.loginId; }
  get password() { return this.loginForm.controls.password; }
  get mobile() { return this.loginForm.controls.mobile; }
  get captcha() { return this.loginForm.controls.captcha; }


  submitForm() {
    //debugger;
    // tslint:disable-next-line:forin
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
    }
    if (this.loginForm.valid) {
      //console.log('Valid!');
      //console.log(this.loginForm.value);
      //this.router.navigate(['dashboard']);
      this.doLoginAction();

    }else{
      console.log("InValid !!!");
      console.log(this.loginForm.value);   
    }
  }

  ngOnInit() {
    super.ngOnInit();
  }

  doLoginAction() {
    this.message = 'Trying to log in ...';
    
    this.loginInfo.loginId = this.loginForm.value["loginId"]; // $("#loginId").val();
    this.loginInfo.password = this.loginForm.value["password"]; // $("#password").val();
    
    let redirectUrl = this.authService.getUrlParam("redirectUrl");

    this.authService.login(this.loginInfo).subscribe(result => {
      //debugger;
      console.log("login result:" + JSON.stringify(result));
      if (result == null){
        this.message = "something is wrong.";
        return;
      }
      
      let errmsg = result["errmsg"];
      if (errmsg == null){
        errmsg = result["resultMsg"];
      }
      if (this.authService.isLoggedIn) {
        // login successful
        this.message = errmsg;
        
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        console.log("redirect=====" + redirectUrl);
        let redirect = redirectUrl ? redirectUrl : '/';
        if (redirect.indexOf("%3F") >= 0){
          redirect = decodeURIComponent(redirect);          
          if (redirect.indexOf("%23anchor") > 0){
            redirect = redirect.replace("%23anchor", "");
          }
        }
        //%2Findex%3Fsession_id%3D5a8b5a38-a3f3-4ed1-95e2-13bbc35937c1%23anchor#anchor
        //debugger;
        // Set our navigation extras object
        // that passes on our global query params and fragment
        let navigationExtras: NavigationExtras = {
          preserveQueryParams: true,
          preserveFragment: false
        };

        // Redirect the user
        this.router.navigate([redirect], navigationExtras);
      }else{
        // login failed
         this.message = errmsg;
         console.log(this.message);
         this.alert(this.message);
      }     

    });
  }

  forgetPwd(){
    
  }

}
